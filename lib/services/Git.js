const {spawn} = require('child_process');
const Git = require('simple-git')();

module.exports = class {

  static call(cmd, args) {
    spawn('git', [cmd, ...args], { shell: true, stdio: 'inherit' });
  }

  static getLocalBranches() {
    return new Promise((resolve, reject) => {
      Git.branchLocal((err, {branches}) => {
        if (err) { return reject(err); }
        resolve(branches);
      });
    });
  }

  static checkout(branch) {
    this.call('checkout', [branch]);
  }

};
