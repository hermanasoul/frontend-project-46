import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '__fixtures__', filename)

const runCLI = (args) => {
  const command = `node ./gendiff.js ${args}`
  return execSync(command).toString().trim()
}

describe('CLI', () => {
  it('should show help with -h flag', () => {
    const output = runCLI('-h')
    expect(output).toContain('Usage: gendiff [options]')
    expect(output).toContain('Compares two configuration files')
  })

  it('should show version with -V flag', () => {
    const output = runCLI('-V')
    expect(output).toBe('1.0.0')
  })

  it('should compare files with stylish format by default', () => {
    const file1 = getFixturePath('flat1.json')
    const file2 = getFixturePath('flat2.json')
    const output = runCLI(`${file1} ${file2}`)
    expect(output).toContain('{')
    expect(output).toContain('+ verbose: true')
  })

  it('should compare files with plain format when specified', () => {
    const file1 = getFixturePath('flat1.json')
    const file2 = getFixturePath('flat2.json')
    const output = runCLI(`${file1} ${file2} --format plain`)
    expect(output).toContain('Property')
    expect(output).toContain('was added')
  })

  it('should compare files with stylish format when specified', () => {
    const file1 = getFixturePath('flat1.json')
    const file2 = getFixturePath('flat2.json')
    const output = runCLI(`${file1} ${file2} -f stylish`)
    expect(output).toContain('{')
    expect(output).toContain('+ verbose: true')
  })

  it('should handle error for unknown format', () => {
    const file1 = getFixturePath('flat1.json')
    const file2 = getFixturePath('flat2.json')
    expect(() => runCLI(`${file1} ${file2} -f unknown`)).toThrow()
  })
})

describe('CLI with json format', () => {
  it('should compare files with json format when specified', () => {
    const file1 = getFixturePath('flat1.json')
    const file2 = getFixturePath('flat2.json')
    const output = runCLI(`${file1} ${file2} --format json`)

    const parsed = JSON.parse(output)
    expect(Array.isArray(parsed)).toBe(true)
  })

  it('should compare files with json format using short flag', () => {
    const file1 = getFixturePath('flat1.json')
    const file2 = getFixturePath('flat2.json')
    const output = runCLI(`${file1} ${file2} -f json`)

    const parsed = JSON.parse(output)
    expect(Array.isArray(parsed)).toBe(true)
  })
})
