#!/usr/bin/env node

const { program } = require('commander');

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-V, --version', 'output the version number')
  .option('-h, --help', 'display help for command')

program.parse(process.argv);
