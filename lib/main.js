const {h, render} = require('ink');
const jsx = require('import-jsx');
const Process = require('./services/Process');
const Git = require('./services/Git');

Git.checkIsRepo().then(() => {

  const args = process.argv.slice(2);

  if (args.length > 0) {
    return Git.spawn('branch', args).then(() => {
      Process.exit();
    });
  }

  render(h(jsx('./app')));

}).catch(() => {
  Git.spawn('status');
  Process.exit();
});
