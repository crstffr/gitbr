const {h, Color, Component} = require('ink');
const QuickSearch = require('ink-quicksearch');

const ItemComponent = function({item, isHighlighted, isSelected, children}) {
  const isCurrent = item.value === this.props.current;
  if (!isHighlighted) {
    return <span/>;
  }
  if (isCurrent && !isSelected) {
    return <Color yellow>{children}</Color>;
  }
  if (isSelected) {
    this.focusedItem = item;
    return <Color green>{children}</Color>;
  }
  return <span>{children}</span>;
};


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

      itemComponent: ItemComponent.bind(this),

      items: this.props.branches.map(branch => ({
        value: branch,
        label: branch
      })),

      initialSelectionIndex: this.props.branches.reduce((acc, value, i) => {
        return (value === this.props.current) ? i : acc;
      }, 0),

      statusComponent: ({children, hasMatch}) => {
        if (hasMatch) {
          return <span/>;
        }
        return <div>
          <Color white>{children}</Color>
          <Color red> No Matches</Color>
        </div>;
      },

      indicatorComponent: ({isSelected}) => {
        const dot = (isSelected) ? ' * ' : '  ';
        return <Color white>{dot}</Color>;
      },

      highlightComponent: ({isHighlighted, isSelected, children}) => {
        return (isHighlighted)
          ? <Color hex={isSelected ? '#FFF' : ''}>{children}</Color>
          : <span/>;
      }

    };

    return <QuickSearch {...props} />;
  }
};

