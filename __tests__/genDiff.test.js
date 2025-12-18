import { describe, it, expect } from 'vitest';
import genDiff from '../src/index.js';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

describe('genDiff with json format', () => {
  it('should generate correct json diff for nested JSON files', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const result = genDiff(file1, file2, 'json');
    
    // Проверяем, что результат валидный JSON
    const parsed = JSON.parse(result);
    expect(Array.isArray(parsed)).toBe(true);
    
    // Проверяем структуру
    const commonNode = parsed.find(node => node.key === 'common');
    expect(commonNode).toBeDefined();
    expect(commonNode.type).toBe('nested');
    expect(Array.isArray(commonNode.children)).toBe(true);
    
    // Проверяем конкретные изменения
    const addedNodes = commonNode.children.filter(node => node.type === 'added');
    expect(addedNodes).toHaveLength(4);
    
    const followNode = addedNodes.find(node => node.key === 'follow');
    expect(followNode).toBeDefined();
    expect(followNode.value).toBe(false);
  });
  
  it('should generate correct json diff for nested YAML files', () => {
    const file1 = getFixturePath('file1.yaml');
    const file2 = getFixturePath('file2.yaml');
    const result = genDiff(file1, file2, 'json');
    
    const parsed = JSON.parse(result);
    expect(Array.isArray(parsed)).toBe(true);
  });
  
  it('should generate correct json diff for flat files', () => {
    const file1 = getFixturePath('flat1.json');
    const file2 = getFixturePath('flat2.json');
    const result = genDiff(file1, file2, 'json');
    
    const parsed = JSON.parse(result);
    expect(Array.isArray(parsed)).toBe(true);
    
    const removedNodes = parsed.filter(node => node.type === 'removed');
    expect(removedNodes).toHaveLength(3);
  });
});
