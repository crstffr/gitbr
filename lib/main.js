const {h, render} = require('ink');
const jsx = require('import-jsx');
const Process = require('./services/Process');
const Git = require('./services/Git');

Git.checkIsRepo().then(() => {

  const args = process.argv.slice(2);

  if (args.length > 0) {
    Git.call('branch', args);
    Process.exit();
  }

  render(h(jsx('./app')));

}).catch(() => {
  Git.call('status');
  Process.exit();
});
