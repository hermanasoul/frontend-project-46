import { describe, test, expect } from 'vitest';
import { parse } from '../src/parser.js';
import fs from 'fs';

const getFixturePath = (filename) => `${process.cwd()}/${filename}`;

describe('parse', () => {
  test('correctly compares identical flat JSON files', () => {
    const file1 = fs.readFileSync(getFixturePath('file1.json'), 'utf-8');
    const file2 = fs.readFileSync(getFixturePath('file1.json'), 'utf-8');

    expect(parse(file1, file2)).toBe('The files are identical.');
  });

  test('correctly compares different flat JSON files', () => {
    const file1 = fs.readFileSync(getFixturePath('file1.json'), 'utf-8');
    const file2 = fs.readFileSync(getFixturePath('file2.json'), 'utf-8');

    expect(parse(file1, file2)).toBe('Differences found.');
  });
});
