#!/usr/bin/env node

const {h, render} = require('ink');
const jsx = require('import-jsx');
const Git = require('./lib/services/Git');

let args = process.argv.slice(2);

if (args.length > 0) {
  Git.call('branch', args);
  process.exit();
}

console.log('run gitbr');

// render(h(jsx('./lib/entry')));
