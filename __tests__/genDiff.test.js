import { describe, it, expect } from 'vitest';
import genDiff from '../src/index.js';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

describe('genDiff with recursive structures', () => {
  const expectedDiff = readFixture('expectedStylish.txt');
  
  it('should generate correct stylish diff for nested JSON files', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const result = genDiff(file1, file2);
    expect(result).toBe(expectedDiff);
  });
  
  it('should generate correct stylish diff for nested YAML files', () => {
    const file1 = getFixturePath('file1.yaml');
    const file2 = getFixturePath('file2.yaml');
    const result = genDiff(file1, file2);
    expect(result).toBe(expectedDiff);
  });
  
  it('should generate correct diff for flat files in stylish format', () => {
    const file1 = getFixturePath('flat1.json');
    const file2 = getFixturePath('flat2.json');
    const result = genDiff(file1, file2);
    expect(result).toBe(readFixture('expectedFlatStylish.txt'));
  });
});
