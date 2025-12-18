import { parseFile } from './parser.js';
import buildDiff from './buildDiff.js';
import formatStylish from './formatters/stylish.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  const diff = buildDiff(data1, data2);
  
  const formatters = {
    stylish: formatStylish,
  };
  
  const formatter = formatters[format];
  if (!formatter) {
    throw new Error(`Unknown format: ${format}`);
  }
  
  return formatter(diff);
};

export default genDiff;