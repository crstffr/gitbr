
module.exports = class {

  static exit(code) {
    return setTimeout(() => {
      process.exit(code);
    }, 1);
  }

};
