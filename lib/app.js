const {h, Component} = require('ink');
const Process = require('./services/Process');
const Git = require('./services/Git');
const jsx = require('import-jsx');

const BranchSelector = jsx('./components/BranchSelector');

module.exports = class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      branches: [],
      current: '',
      busy: true,
    };
  }

  onSelectBranch(branch) {
    this.setState({busy: true});
    if (branch !== this.state.current) {
      Git.checkout(branch);
    }
    Process.exit();
  }

  onDeleteBranch(branch) {
    //console.log('DELETE', branch);
  }

  componentWillMount() {

    Git.getLocalBranches().then(branches => {

      const localbranches = Object.keys(branches).map(key => {

        const branch = branches[key];

        if (branch.current) {
          this.setState({current: branch.name});
        }

        return branch.name;
      });

      this.setState({branches: localbranches, busy: false});

    }).catch(e => {
      throw new Error(e);
    });
  }

  render() {

    if (this.state.busy) {
      return <span/>;
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
