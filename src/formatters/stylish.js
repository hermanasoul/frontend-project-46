import _ from 'lodash'

const stringify = (value, depth) => {
  const indent = ' '.repeat(depth * 4)  // Отступ для ключей: глубина * 4 пробела
  const bracketIndent = ' '.repeat(depth * 4)  // Отступ для закрывающей скобки: равен отступу для ключей
  if (!_.isObject(value) || value === null) {
    if (value === '') return ''
    if (value === null) return 'null'
    return String(value)
  }
  const lines = Object.entries(value).map(([key, val]) => {
    // Формируем строку для каждого ключа без лишних пробелов (только indent)
    return `${indent}${key}: ${stringify(val, depth + 1)}`
  })
  return `{\n${lines.join('\n')}\n${bracketIndent}}`
}

const formatStylish = (diff, depth = 1) => {
  const indent = ' '.repeat(depth * 4 - 2)
  const bracketIndent = ' '.repeat((depth - 1) * 4)
  // Остальная часть функции без изменений
  const lines = diff.map((node) => {
    const { key, type } = node
    switch (type) {
      case 'added':
        return `${indent}+ ${key}: ${stringify(node.value, depth)}`
      case 'removed':
        return `${indent}- ${key}: ${stringify(node.value, depth)}`
      case 'unchanged':
        return `${indent}  ${key}: ${stringify(node.value, depth)}`
      case 'changed':
        return [
          `${indent}- ${key}: ${stringify(node.value1, depth)}`,
          `${indent}+ ${key}: ${stringify(node.value2, depth)}`,
        ]
      case 'nested':
        return `${indent}  ${key}: ${formatStylish(node.children, depth + 1)}`
      default:
        throw new Error(`Unknown node type: ${type}`)
    }
  })
  return `{\n${lines.flat().join('\n')}\n${bracketIndent}}`
}

export default formatStylish
