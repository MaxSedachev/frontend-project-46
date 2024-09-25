import yaml from 'js-yaml';
import { getFile, getFormat } from './index.js';

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
