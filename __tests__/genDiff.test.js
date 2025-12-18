import { describe, it, expect } from 'vitest';
import genDiff from '../src/index.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

const expectedDiff = `{
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
  - follow: false
}`;

describe('genDiff', () => {
  it('should generate correct diff for JSON files', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const result = genDiff(file1, file2);
    expect(result).toBe(expectedDiff);
  });

  it('should generate correct diff for YAML files', () => {
    const file1 = getFixturePath('file1.yaml');
    const file2 = getFixturePath('file2.yaml');
    const result = genDiff(file1, file2);
    expect(result).toBe(expectedDiff);
  });

  it('should generate empty diff for identical files', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file1.json');
    const result = genDiff(file1, file2);
    expect(result).toBe(`{
    host: hexlet.io
    timeout: 50
    proxy: 123.234.53.22
    follow: false
}`);
  });
});
