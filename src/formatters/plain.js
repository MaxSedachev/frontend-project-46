const formatValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const plain = (diff, path = '') => {
  const formatItem = (item, currentPath) => {
    const fullPath = currentPath ? `${currentPath}.${item.key}` : item.key;

    switch (item.type) {
      case 'added':
        return `Property '${fullPath}' was added with value: ${formatValue(item.value)}`;
      case 'deleted':
        return `Property '${fullPath}' was removed`;
      case 'changed':
        return `Property '${fullPath}' was updated. From ${formatValue(item.value1)} to ${formatValue(item.value2)}`;
      case 'nested':
        return plain(item.children, fullPath);
      default:
        throw new Error(`Unknown type: ${item.type}`);
    }
  };

  const result = diff
    .filter((item) => item.type !== 'unchanged')
    .map((item) => formatItem(item, path));

  return result.join('\n');
};

export default plain;
