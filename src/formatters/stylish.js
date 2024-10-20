import _ from 'lodash';

const stylish = (file, replacer = ' ', spaceCount = 4) => {
  const iter = (obj, depth) => {
    if (!_.isObject(obj)) return `${obj}`;
    const lines = obj.map((item) => {
      const iter1 = (obj1, depth1) => {
        if (!_.isObject(obj1)) return `${obj1}`;
        const test = Object.entries(obj1).map(([key, value]) => {
          const preparedValue = iter1(value, depth1);
          const indent = replacer.repeat(depth1 * spaceCount);
          return `${indent}${key}: ${preparedValue}`;
        });
        const outIndent = replacer.repeat((depth1 * spaceCount) - spaceCount);
        const result = ['{', ...test, `${outIndent}}`].join('\n');
        return result;
      };
      const preparedValue = iter1(item.value, depth + 1);
      const forNested = iter(item.children, depth + 1);
      const indent = replacer.repeat(depth * spaceCount);
      if (item.type === 'unchanged') {
        return `${indent}  ${item.key}: ${preparedValue}`;
      } if (item.type === 'deleted') {
        return `${indent}- ${item.key}: ${preparedValue}`;
      } if (item.type === 'added') {
        return `${indent}+ ${item.key}: ${preparedValue}`;
      } if (item.type === 'changed') {
        return `${indent}- ${item.key}: ${iter1(item.value1, depth + 2)}\n${indent}+ ${item.key}: ${iter1(item.value2, depth + 2)}`;
      } if (item.type === 'nested') {
        return `${indent}${item.key}: ${forNested}`;
      }
      return lines;
    });
    const outIndent = replacer.repeat((depth * spaceCount) - spaceCount);
    const result = ['{', ...lines, `${outIndent}}`].join('\n');
    return result.trim();
  };
  return iter(file, 1);
};
export default stylish;
