#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from './src/index.js';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>', 'first configuration file')
  .argument('<filepath2>', 'second configuration file')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const result = genDiff(filepath1, filepath2);
    console.log(result);
  });

program.parse();
