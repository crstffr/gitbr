const {h, Component} = require('ink');
const Process = require('./services/Process');
const Git = require('./services/Git');
const jsx = require('import-jsx');

const Spinner = require('ink-spinner');
const BranchDelete = jsx('./components/BranchDelete');
const BranchSelector = jsx('./components/BranchSelector');

module.exports = class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      branches: [],
      deleting: '',
      current: '',
      blank: false,
      busy: false,
    };
  }

  componentWillMount() {
    this.getBranches();
  }

  getBranches() {
    let busy = true;
    let blank = false;
    this.setState({busy, blank, branches: []});

    return Git.getLocalBranches().then(result => {

      busy = false;

      const branches = Object.keys(result).map(key => {
        const {current, name} = result[key];
        if (current === true) {
          this.setState({current: name});
        }
        return name;
      });

      if (branches.length <= 1) {
        Process.exit();
      }

      this.setState({busy, blank, branches});

    }).catch(err => {
      if (err) {
        console.log(err);
      }
    });
  }

  onSelectBranch(branch) {
    if (branch === this.state.current) {
      return Process.exit();
    }
    this.setState({busy: true});
    Git.checkoutBranch(branch).then(() => {
      this.setState({busy: false, blank: true}, () => {
        Process.exit();
      });
    });
  }

  onDeleteBranch(branch) {
    if (branch !== this.state.current) {
      this.setState({deleting: branch});
    }
  }

  onDeleteComplete() {
    this.setState({deleting: '', blank: true}, () => {
      this.getBranches();
    });
  }

  render() {

    if (this.state.blank) {
      return <span/>;
    }

    if (this.state.busy) {
      return (
        <span>
          <Spinner type="line"/> <span>Working...</span>
        </span>
      )
    }

    if (this.state.deleting) {
      return (
        <BranchDelete
          branch={this.state.deleting}
          onComplete={this.onDeleteComplete.bind(this)}/>
      )
    }

    return (
      <BranchSelector
        current={this.state.current}
        branches={this.state.branches}
        onSelect={this.onSelectBranch.bind(this)}
        onDelete={this.onDeleteBranch.bind(this)}/>
    );
  }

};
