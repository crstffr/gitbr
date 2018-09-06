
class Process {

  constructor () {
    this.exitCallbacks = [];
  }

  beforeExit(fn) {
    if (typeof fn === 'function') {
      this.exitCallbacks.push(fn);
    }
  }

  exit(code) {
    //this.exitCallbacks.forEach(fn => fn(code));
    return setTimeout(() => {
      process.exit(code);
    }, 1);
  }

}

module.exports = new Process();
