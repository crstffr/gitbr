const {h, Bold, Color, Component} = require('ink');
const QuickSearch = require('ink-quicksearch');

module.exports = class BranchSelector extends Component {

  constructor (props) {
    super(props);
    this.focusedItem = '';
    this.onKeypress = this.onKeypress.bind(this);
  }

  componentWillMount() {
    process.stdin.on('keypress', this.onKeypress);
  }

  componentWillUnmount() {
    process.stdin.removeListener('keypress', this.onKeypress);
  }

  onKeypress(ch, key) {
    if (key.name === 'delete') {
      this.onDelete(this.focusedItem);
    }
  }

  onDelete(branch) {
    const cb = this.props.onDelete;
    if (typeof cb === 'function') {
      cb(branch.value);
    }
  }

  onSelect(branch) {
    const cb = this.props.onSelect;
    if (typeof cb === 'function') {
      cb(branch.value);
    }
  }

  render() {

    const props = {

      onSelect: this.onSelect.bind(this),

      items: this.props.branches.map(branch => ({
        value: branch,
        label: branch
      })),

      initialSelectionIndex: this.props.branches.reduce((acc, value, i) => {
        return (value === this.props.current) ? i : acc;
      }, 0),

      indicatorComponent: ({isSelected}) => {
        const dot = (isSelected) ? ' * ' : '  ';
        return <Color white>{dot}</Color>;
      },

      highlightComponent: ({isHighlighted, isSelected, children}) => {
        return (isHighlighted)
          ? <Color hex={isSelected ? '#FFF' : ''}>{children}</Color>
          : <span/>;
      },

      statusComponent: ({children, hasMatch}) => {
        if (hasMatch) {
          return <span/>;
        }
        return (
          <span>
            <Color white>{children}</Color>
            <Color red> No Matches</Color>
          </span>
        );
      },

      itemComponent: ({item, isHighlighted, isSelected, children}) => {
        if (!isHighlighted) { return null; }

        const props = {};

        if (item.value === this.props.current && !isSelected) {
          props.yellow = true;
        }

        if (isSelected) {
          props.green = true;
          this.focusedItem = item;
        }

        return <Color {...props}>{children}</Color>;
      }
    };

    return <QuickSearch {...props} />;
  }
};

