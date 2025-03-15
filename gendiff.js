#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-h, --help', 'display help for command')
  .action(() => {
    console.log('Help message will be displayed here.'); // л
  })
  .parse(process.argv);
