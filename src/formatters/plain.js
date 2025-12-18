import _ from 'lodash'

const stringify = (value) => {
  if (_.isPlainObject(value) || _.isArray(value)) {
    return '[complex value]'
  }

  if (typeof value === 'string') {
    return `'${value}'`
  }

  if (value === null) {
    return null
  }

  return String(value)
}

const formatPlain = (diff, path = '') => {
  const lines = diff.flatMap((node) => {
    const currentPath = path ? `${path}.${node.key}` : node.key

    switch (node.type) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${stringify(node.value)}`

      case 'removed':
        return `Property '${currentPath}' was removed`

      case 'changed':
        return `Property '${currentPath}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`

      case 'nested':
        return formatPlain(node.children, currentPath)

      case 'unchanged':
        return []

      default:
        return [] // Изменено: вместо throw возвращаем пустой массив
    }
  })

  return lines.join('\n')
}

export default formatPlain
