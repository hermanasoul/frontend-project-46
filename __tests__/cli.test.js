import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

describe('CLI with json format', () => {
  const runCLI = (args) => {
    const command = `node ./gendiff.js ${args}`;
    return execSync(command).toString().trim();
  };
  
  it('should compare files with json format when specified', () => {
    const file1 = getFixturePath('flat1.json');
    const file2 = getFixturePath('flat2.json');
    const output = runCLI(`${file1} ${file2} --format json`);
    
    // Проверяем, что вывод валидный JSON
    const parsed = JSON.parse(output);
    expect(Array.isArray(parsed)).toBe(true);
  });
  
  it('should compare files with json format using short flag', () => {
    const file1 = getFixturePath('flat1.json');
    const file2 = getFixturePath('flat2.json');
    const output = runCLI(`${file1} ${file2} -f json`);
    
    const parsed = JSON.parse(output);
    expect(Array.isArray(parsed)).toBe(true);
  });
});