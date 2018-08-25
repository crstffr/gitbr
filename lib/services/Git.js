let {spawn} = require('child_process');
let git = require('simple-git');

module.exports = class Git {

  static call(cmd, args) {
    spawn('git', [cmd, ...args], { shell: true, stdio: 'inherit' });
  }

};
