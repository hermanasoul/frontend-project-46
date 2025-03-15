#!/usr/bin/env node

const { Command } = require('commander');
const _ = require('lodash');
const parseFile = require('./src/parser');

const genDiff = (filepath1, filepath2) => {
  const file1Data = parseFile(filepath1);
  const file2Data = parseFile(filepath2);

  const sortedKeys = _.sortBy(_.union(_.keys(file1Data), _.keys(file2Data)));

  const diff = sortedKeys.map((key) => {
    if (!_.has(file2Data, key)) {
      return `  - ${key}: ${file1Data[key]}`;
    }
    if (!_.has(file1Data, key)) {
      return `  + ${key}: ${file2Data[key]}`;
    }
    if (file1Data[key] !== file2Data[key]) {
      return [
        `  - ${key}: ${file1Data[key]}`,
        `  + ${key}: ${file2Data[key]}`
      ];
    }
    return null;
  }).filter(Boolean);

  return diff.flat().join('\n');
};

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>', 'first configuration file')
  .argument('<filepath2>', 'second configuration file')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2, options) => {
    const result = genDiff(filepath1, filepath2);
    console.log(result);
  })
  .parse(process.argv);
