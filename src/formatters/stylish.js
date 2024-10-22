import _ from 'lodash';

const status = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
  nested: ' ',
};

// Функция для получения отступов
const getIndent = (depth, correctSize = 0) => {
  const replacer = '  ';
  const indentSize = depth * 2;
  const currentIndent = replacer.repeat(indentSize - correctSize);
  const bracketIndent = replacer.repeat(indentSize - 2);
  return { currentIndent, bracketIndent };
};

// Форматирование фигурных скобок
const formatBraces = (lines, depth) => {
  const { bracketIndent } = getIndent(depth);
  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

// Строковое представление объекта
const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }

  const { currentIndent } = getIndent(depth);
  const lines = Object.entries(value).map(
    ([key, val]) => `${currentIndent}${key}: ${stringify(val, depth + 1)}`,
  );

  return formatBraces(lines, depth);
};

// Основная функция форматирования
const stylish = (node, depth = 1) => {
  const result = node.map(({
    key, value, type, value1, value2, children,
  }) => {
    const { currentIndent } = getIndent(depth, 1);

    switch (type) {
      case 'added':
        return `${currentIndent}${status.added} ${key}: ${stringify(value, depth + 1)}`;
      case 'deleted':
        return `${currentIndent}${status.deleted} ${key}: ${stringify(value, depth + 1)}`;
      case 'changed':
        return [
          `${currentIndent}${status.deleted} ${key}: ${stringify(value1, depth + 1)}`,
          `${currentIndent}${status.added} ${key}: ${stringify(value2, depth + 1)}`,
        ].join('\n');
      case 'nested':
        return `${currentIndent}${status.nested} ${key}: ${stylish(children, depth + 1)}`;
      case 'unchanged':
        return `${currentIndent}${status.unchanged} ${key}: ${stringify(value, depth + 1)}`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

  return formatBraces(result, depth);
};

export default stylish;
