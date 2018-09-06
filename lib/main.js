const {h, render} = require('ink');
const jsx = require('import-jsx');
const Process = require('./services/Process');
const Git = require('./services/Git');

Git.checkIsRepo().then(isRepo => {

  if (!isRepo) {
    return Git.spawn('status').then(() => {
      Process.exit();
    });
  }

  const args = process.argv.slice(2);

  if (args.length > 0) {
    return Git.spawn('branch', args).then(() => {
      Process.exit();
    });
  }

  render(h(jsx('./app')));

}).catch(err => {
  if (err) { console.log(err); }
});
