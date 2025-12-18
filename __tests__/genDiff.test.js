import { describe, it, expect } from 'vitest';
import genDiff from '../src/index.js';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

describe('genDiff with different formats', () => {
  describe('stylish format (default)', () => {
    const expectedStylish = readFixture('expectedStylish.txt');
    
    it('should generate correct stylish diff for nested JSON files', () => {
      const file1 = getFixturePath('file1.json');
      const file2 = getFixturePath('file2.json');
      const result = genDiff(file1, file2, 'stylish');
      expect(result).toBe(expectedStylish);
    });
    
    it('should generate correct stylish diff for nested YAML files', () => {
      const file1 = getFixturePath('file1.yaml');
      const file2 = getFixturePath('file2.yaml');
      const result = genDiff(file1, file2, 'stylish');
      expect(result).toBe(expectedStylish);
    });
    
    it('should use stylish as default format', () => {
      const file1 = getFixturePath('file1.json');
      const file2 = getFixturePath('file2.json');
      const resultDefault = genDiff(file1, file2);
      const resultExplicit = genDiff(file1, file2, 'stylish');
      expect(resultDefault).toBe(resultExplicit);
    });
  });
  
  describe('plain format', () => {
    const expectedPlain = readFixture('expectedPlain.txt');
    
    it('should generate correct plain diff for nested JSON files', () => {
      const file1 = getFixturePath('file1.json');
      const file2 = getFixturePath('file2.json');
      const result = genDiff(file1, file2, 'plain');
      expect(result).toBe(expectedPlain);
    });
    
    it('should generate correct plain diff for nested YAML files', () => {
      const file1 = getFixturePath('file1.yaml');
      const file2 = getFixturePath('file2.yaml');
      const result = genDiff(file1, file2, 'plain');
      expect(result).toBe(expectedPlain);
    });
    
    it('should generate correct plain diff for flat files', () => {
      const file1 = getFixturePath('flat1.json');
      const file2 = getFixturePath('flat2.json');
      const result = genDiff(file1, file2, 'plain');
      const expected = `Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`;
      expect(result).toBe(expected);
    });
  });
  
  describe('error handling', () => {
    it('should throw error for unknown format', () => {
      const file1 = getFixturePath('file1.json');
      const file2 = getFixturePath('file2.json');
      expect(() => genDiff(file1, file2, 'unknown')).toThrow('Unknown format: unknown');
    });
  });
});
