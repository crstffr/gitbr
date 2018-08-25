const {h, render} = require('ink');
const jsx = require('import-jsx');
const Git = require('./services/Git');

const args = process.argv.slice(2);

if (args.length > 0) {
  Git.call('branch', args);
  process.exit();
}

render(h(jsx('./app')));
