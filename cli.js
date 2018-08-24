#!/usr/bin/env node

const importJsx = require('import-jsx');
const {h, render} = require('ink');
const meow = require('meow');

const Ui = importJsx('./ui');

const cli = meow(`
	Usage
	  $ gitbr [input]

	Options
	  --name  Lorem ipsum [Default: false]

	Examples
	  $ gitbr
	  I love Ink
	  $ gitbr --name=ponies
	  I love ponies
`);

render(h(Ui, cli.flags));
