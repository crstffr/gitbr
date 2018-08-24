const {h, Component, Color} = require('ink');
const PropTypes = require('prop-types');
const git = require('simple-git')();
const Branches = require('import-jsx')('./lib/Branches');

class UI extends Component {

  constructor (props) {
    super(props);

    this.state = {
      selected: 0,
      branches: [],
    }
  }

  componentWillMount() {
    git.branchLocal((err, {branches}) => {
      branches = Object.keys(branches).map(key => {
        const branch = branches[key];
        return {
          value: branch.name,
          label: branch.name
        }
      });
      this.setState({branches});
    });
  }

	render({name}) {
		return (
			<Branches selected={this.state.selected} branches={this.state.branches}/>
		);
	}
}

module.exports = UI;
