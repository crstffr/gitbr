
module.exports = class {

  static exit(code) {
    setTimeout(() => {
      process.exit(code);
    }, 1);
  }

};
