const fs = require('fs')
const path = require('path')

const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  try {
    const data = fs.readFileSync(absolutePath, 'utf-8')
    return JSON.parse(data)
  }
  catch (error) {
    console.error(`Error reading or parsing file: ${filepath}`)
    process.exit(1)
  }
}

const parse = (file1, file2) => {
  const obj1 = parseFile(file1)
  const obj2 = parseFile(file2)

  const isIdentical = JSON.stringify(obj1) === JSON.stringify(obj2)
  return isIdentical ? 'The files are identical.' : 'Differences found.'
}

module.exports = { parse }
