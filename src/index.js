import path from 'node:path';
import findDifferences from './differences.js';
import parse from './parsers.js';

const getPath = (filePath) => path.resolve(process.cwd(), filePath);

const getDiff = (filepath1, filepath2) => {
  const path1 = getPath(filepath1);
  const path2 = getPath(filepath2);

  const parsedFile1 = parse(path1);
  const parsedFile2 = parse(path2);
  //   // Проверка парсинга данных из файлов (шаг-3)
  //   // console.log("parsedFile1:", parsedFile1)
  //   // console.log("parsedFile2:", parsedFile2)
  const result = findDifferences(parsedFile1, parsedFile2);
  //   // Проверка поиска различий между двумя json-файлами (шаг-4)
  console.log('result:', result);
  return result;
};

export default getDiff;
