import { parseFile } from './parser.js';
import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));
  
  return keys.map((key) => {
    if (!_.has(data2, key)) {
      return { key, value: data1[key], type: 'removed' };
    }
    if (!_.has(data1, key)) {
      return { key, value: data2[key], type: 'added' };
    }
    if (data1[key] === data2[key]) {
      return { key, value: data1[key], type: 'unchanged' };
    }
    return {
      key,
      value1: data1[key],
      value2: data2[key],
      type: 'changed'
    };
  });
};

const formatDiff = (diff) => {
  const lines = diff.map((item) => {
    switch (item.type) {
      case 'added':
        return `  + ${item.key}: ${item.value}`;
      case 'removed':
        return `  - ${item.key}: ${item.value}`;
      case 'unchanged':
        return `    ${item.key}: ${item.value}`;
      case 'changed':
        return [`  - ${item.key}: ${item.value1}`, `  + ${item.key}: ${item.value2}`];
      default:
        return '';
    }
  });

  return `{\n${lines.flat().join('\n')}\n}`;
};

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  const diff = buildDiff(data1, data2);
  return formatDiff(diff);
};

export default genDiff;