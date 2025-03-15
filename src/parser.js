const fs = require('fs');
const path = require('path');

const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  try {
    const data = fs.readFileSync(absolutePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading or parsing file: ${filepath}`);
    process.exit(1);
  }
};

module.exports = parseFile;
