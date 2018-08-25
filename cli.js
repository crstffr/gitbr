#!/usr/bin/env node

const importJsx = require('import-jsx');
const {h, render} = require('ink');

const Entry = importJsx('./lib/entry');

console.log(process.argv.slice(2));

// render(h(Entry));
