const {h, Component} = require('ink');
const Process = require('./services/Process');
const Git = require('./services/Git');
const jsx = require('import-jsx');

const Spinner = require('ink-spinner');
const BranchSelector = jsx('./components/BranchSelector');

module.exports = class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      branches: [],
      current: '',
      blank: false,
      busy: false,
    };
  }

  onSelectBranch(branch) {
    this.setState({busy: true});
    Git.checkout(branch).then(() => {
      this.setState({blank: true});
      return Process.exit();
    });
  }

  onDeleteBranch(branch) {
    //console.log('DELETE', branch);
  }

  componentWillMount() {

    this.setState({busy: true});

    Git.getLocalBranches().then(branches => {

      const localbranches = Object.keys(branches).map(key => {
        const {current, name} = branches[key];
        if (current) {
          this.setState({current: name});
        }
        return name;
      });
      
      this.setState({
        busy: false,
        branches: localbranches,
      });

      if (localbranches.length <= 1) {
        Process.exit();
      }

    }).catch(e => {
      throw new Error(e);
    });
  }

  render() {

    if (this.state.blank) {
      return <span/>;
    }

    if (this.state.busy) {
      return (
        <span>
          <Spinner type="line"/> Working...
        </span>
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
