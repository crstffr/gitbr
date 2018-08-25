const {h, Bold, Color, Component} = require('ink');
const QuickSearch = require('ink-quicksearch');

const StatusComponent = ({children}) => <Color white>{children}</Color>;

const IndicatorComponent = ({isSelected}) => {
  return (isSelected)
    ? <Color white>	<Bold>*</Bold> </Color>
    : <Color white> &nbsp; </Color>;
};

const ItemComponent = ({item, isHighlighted, isSelected, children}) => {
  return (isHighlighted)
    ? (isSelected) ? <Color green>{children}</Color> : <span>{children}</span>
    : <span/>;
};

const HighlightComponent = ({isHighlighted, isSelected, children}) => {
  return (isHighlighted)
    ? <Color hex={isSelected ? '#0F0' : ''}>{children}</Color>
    : <span/>;
};

module.exports = class Branches extends Component {

  constructor (props) {
    super(props);
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
      console.log('DELETE THIS BRANCH!?');
    }
  }

  render() {
    const props = {
      items: this.props.branches,
      itemComponent: ItemComponent,
      statusComponent: StatusComponent,
      indicatorComponent: IndicatorComponent,
      highlightComponent: HighlightComponent,
      initialSelectionIndex: this.props.selected,
      onSelect: item => {
        console.log(item);
        process.exit();
      },
    };

    return <QuickSearch {...props} />
  }
};

