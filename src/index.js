import path from 'node:path';
import findDifferences from './differences.js';
import parse from './parsers.js';
import formatDiff from './formatters/index.js';

const getPath = (filePath) => path.resolve(process.cwd(), filePath);

const getDiff = (filepath1, filepath2, format = 'stylish') => {
  const path1 = getPath(filepath1);
  const path2 = getPath(filepath2);
  const parsedFile1 = parse(path1);
  const parsedFile2 = parse(path2);
  const result = findDifferences(parsedFile1, parsedFile2);
  return formatDiff(result, format);
};

export default getDiff;
