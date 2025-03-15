#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();
const parseFile = require('./src/parser');

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>', 'first configuration file')
  .argument('<filepath2>', 'second configuration file')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2, options) => {
    const file1Data = parseFile(filepath1);
    const file2Data = parseFile(filepath2);
    
    console.log('File 1 Data:', file1Data);
    console.log('File 2 Data:', file2Data);
    
  })
  .parse(process.argv);
