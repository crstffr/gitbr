const {h, Bold, Color, Component} = require('ink');
const Git = require('../services/Git');

module.exports = class BranchDelete extends Component {

  constructor (props) {
    super(props);
    this.onKeypress = this.onKeypress.bind(this);
    this.state = {
      blank: false,
      key: 'n'
    };
    this.options = {
      y: 'Yes',
      n: 'No',
      f: 'Force'
    }
  }

  componentWillMount() {
    process.stdin.on('keypress', this.onKeypress);
  }

  componentWillUnmount() {
    process.stdin.removeListener('keypress', this.onKeypress);
  }

  onKeypress(ch, key) {
    if (this.options[key.name]) {
      this.setState({key: key.name});
    }
    if (key.name === 'return') {
      this.execute();
    }
  }

  execute() {
    let key = this.state.key;
    let force = (key === 'f');
    let branch = this.props.branch;

    if (key === 'n') {
      return this.complete();
    }

    Git.deleteBranch(branch, force).then(() => {
      this.setState({blank: true}, () => {
        this.complete();
      });
    }).catch(err => {
      if (err) { console.log(err); }
      this.complete();
    });
  }

  complete() {
    if (typeof this.props.onComplete === 'function') {
      this.props.onComplete();
    }
  }

  render() {

    if (this.state.blank) {
      return <span/>;
    }

    if (this.state.msg) {
      return (
        <span>{this.state.msg}</span>
      )
    }

    return (
      <span>
        <Color red>Confirm Delete: <Color yellow>{this.props.branch}</Color>?</Color>
        <Color hex="#AAAAAA"> [Nyf]</Color>
        <Bold white> {this.options[this.state.key]}</Bold>
      </span>
    )
  }
};

