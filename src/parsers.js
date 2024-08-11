import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getFile = (filePath) => fs.readFileSync(filePath, 'utf8');
const getFormat = (filePath) => path.extname(filePath);

const parse = (filePath) => {
  const format = getFormat(filePath);
  const data = getFile(filePath);
  if (format === '.json') {
    return JSON.parse(data);
  }
  if (format === '.yaml' || format === '.yml') {
    return yaml.load(data);
  }
  return Error(`Error, format file ${data} is not correct`);
};

export default parse;
