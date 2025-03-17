import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';

describe('gendiff CLI with YAML files', () => {
  it('should generate correct diff between two YAML files', () => {

    const file1 = './__tests__/__fixtures__/file1.yml';
    const file2 = './__tests__/__fixtures__/file2.yml';

    const result = execSync(`node ./gendiff.js ${file1} ${file2}`).toString();
    
    expect(result).toBe(`  - timeout: 50
  + timeout: 20
  + verbose: true
  - follow: false
  + follow: true
  - host: hexlet.io
  + proxy: 123.234.53.22
  `);
  });
});
