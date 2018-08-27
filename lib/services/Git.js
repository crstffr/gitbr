const {spawn} = require('child_process');
const git = require('simple-git')();

module.exports = class {

  static call(cmd, args = []) {
    return new Promise((resolve, reject) => {
      spawn('git', [cmd, ...args], { shell: true, stdio: 'inherit' })
        .on('close', (code, status) => {
          if (code === 0) {
            resolve();
          } else {
            reject(status);
          }
        });
    });
  }

  static checkIsRepo() {
    return new Promise((resolve, reject) => {
      git.checkIsRepo((err, isRepo) => {
        if (err || !isRepo) {
          reject();
        } else {
          resolve();
        }
      })
    });
  }

  static getLocalBranches() {
    return new Promise((resolve, reject) => {
      git.branchLocal((err, {branches}) => {
        if (err) { return reject(err); }
        resolve(branches);
      });
    });
  }

  static checkout(branch) {
    return this.call('checkout', [branch]);
  }

};
