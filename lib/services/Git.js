const {spawn} = require('child_process');
const git = require('simple-git')();

module.exports = class {

  static spawn(cmd, args = []) {
    return new Promise((resolve, reject) => {
      spawn('git', [cmd, ...args], { shell: true, stdio: 'inherit' })
        .on('close', (code, status) => {
          if (code > 0) {
            reject(status);
          } else {
            resolve();
          }
        });
    });
  }

  static checkIsRepo() {
    return new Promise((resolve, reject) => {
      git.checkIsRepo((err, isRepo) => {
        if (err) {
          reject(err);
        } else {
          resolve(isRepo);
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

  static checkoutBranch(branch) {
    return this.spawn('checkout', [branch]);
  }

  static deleteBranch(branch, force) {
    let flag = (force) ? '-D' : '-d';
    return this.spawn('branch', [flag, branch]);
  }

};
