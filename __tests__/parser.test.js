import { describe, it, expect } from 'vitest';
import { parseFile } from '../src/parser.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

describe('parseFile', () => {
  it('should parse JSON file', () => {
    const filepath = getFixturePath('file1.json');
    const result = parseFile(filepath);
    expect(result).toEqual({
      host: 'hexlet.io',
      timeout: 50,
      proxy: '123.234.53.22',
      follow: false,
    });
  });

  it('should parse YAML file', () => {
    const filepath = getFixturePath('file1.yaml');
    const result = parseFile(filepath);
    expect(result).toEqual({
      host: 'hexlet.io',
      timeout: 50,
      proxy: '123.234.53.22',
      follow: false,
    });
  });

  it('should throw error for unsupported format', () => {
    const filepath = getFixturePath('unsupported.txt');
    expect(() => parseFile(filepath)).toThrow('Unsupported file format: .txt');
  });
});
