const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml'); // Подключаем js-yaml

// Функция для парсинга файлов
const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  try {
    const fileExtension = path.extname(filepath).toLowerCase();

    let data;
    if (fileExtension === '.json') {
      data = fs.readFileSync(absolutePath, 'utf-8');
      return JSON.parse(data);
    } else if (fileExtension === '.yml' || fileExtension === '.yaml') {
      data = fs.readFileSync(absolutePath, 'utf-8');
      return yaml.load(data);
    } else {
      throw new Error(`Unsupported file format: ${fileExtension}`);
    }
  } catch (error) {
    console.error(`Error reading or parsing file: ${filepath}`);
    process.exit(1);
  }
};

module.exports = { parseFile };
