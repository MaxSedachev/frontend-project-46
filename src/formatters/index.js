import stylish from './stylish.js';
import plain from './plain.js';

const formatStyle = (result, format) => {
  switch (format) {
    case 'stylish':
      return stylish(result);
    case 'plain':
      return plain(result);
    case 'json':
      return JSON.stringify(result);
    default:
      throw new Error(`Формат не поддерживается: ${format}`);
  }
};
export default formatStyle;
