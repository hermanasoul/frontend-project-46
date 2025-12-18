import { describe, it, expect } from 'vitest'
import genDiff from '../src/index.js'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '__fixtures__', filename)

describe('genDiff with different formats', () => {
  describe('stylish format (default)', () => {
    it('should generate correct stylish diff for nested JSON files', () => {
      const file1 = getFixturePath('file1.json')
      const file2 = getFixturePath('file2.json')
      const result = genDiff(file1, file2, 'stylish')

      expect(result).toContain('common: {')
      expect(result).toContain('+ follow: false')
      expect(result).toContain('- setting2: 200')
    })

    it('should generate correct stylish diff for nested YAML files', () => {
      const file1 = getFixturePath('file1.yaml')
      const file2 = getFixturePath('file2.yaml')
      const result = genDiff(file1, file2, 'stylish')

      expect(result).toContain('common: {')
      expect(result).toContain('+ follow: false')
      expect(result).toContain('- setting2: 200')
    })

    it('should use stylish as default format', () => {
      const file1 = getFixturePath('file1.json')
      const file2 = getFixturePath('file2.json')
      const resultDefault = genDiff(file1, file2)
      const resultExplicit = genDiff(file1, file2, 'stylish')
      expect(resultDefault).toBe(resultExplicit)
    })
  })

  describe('plain format', () => {
    it('should generate correct plain diff for nested JSON files', () => {
      const file1 = getFixturePath('file1.json')
      const file2 = getFixturePath('file2.json')
      const result = genDiff(file1, file2, 'plain')

      expect(result).toContain('Property \'common.follow\' was added with value: false')
      expect(result).toContain('Property \'common.setting2\' was removed')
    })

    it('should generate correct plain diff for nested YAML files', () => {
      const file1 = getFixturePath('file1.yaml')
      const file2 = getFixturePath('file2.yaml')
      const result = genDiff(file1, file2, 'plain')

      expect(result).toContain('Property \'common.follow\' was added with value: false')
      expect(result).toContain('Property \'common.setting2\' was removed')
    })

    it('should generate correct plain diff for flat files', () => {
      const file1 = getFixturePath('flat1.json')
      const file2 = getFixturePath('flat2.json')
      const result = genDiff(file1, file2, 'plain')

      expect(result).toContain('Property \'follow\' was removed')
      expect(result).toContain('Property \'proxy\' was removed')
      expect(result).toContain('Property \'timeout\' was updated')
      expect(result).toContain('Property \'verbose\' was added with value: true')
    })
  })

  describe('json format', () => {
    it('should generate correct json diff for nested JSON files', () => {
      const file1 = getFixturePath('file1.json')
      const file2 = getFixturePath('file2.json')
      const result = genDiff(file1, file2, 'json')

      const parsed = JSON.parse(result)
      expect(Array.isArray(parsed)).toBe(true)

      const commonNode = parsed.find(node => node.key === 'common')
      expect(commonNode).toBeDefined()
      expect(commonNode.type).toBe('nested')
      expect(Array.isArray(commonNode.children)).toBe(true)
    })

    it('should generate correct json diff for nested YAML files', () => {
      const file1 = getFixturePath('file1.yaml')
      const file2 = getFixturePath('file2.yaml')
      const result = genDiff(file1, file2, 'json')

      const parsed = JSON.parse(result)
      expect(Array.isArray(parsed)).toBe(true)
    })

    it('should generate correct json diff for flat files', () => {
      const file1 = getFixturePath('flat1.json')
      const file2 = getFixturePath('flat2.json')
      const result = genDiff(file1, file2, 'json')

      const parsed = JSON.parse(result)
      expect(Array.isArray(parsed)).toBe(true)
    })
  })

  describe('error handling', () => {
    it('should throw error for unknown format', () => {
      const file1 = getFixturePath('file1.json')
      const file2 = getFixturePath('file2.json')
      expect(() => genDiff(file1, file2, 'unknown')).toThrow('Unknown format: unknown')
    })
  })
})
