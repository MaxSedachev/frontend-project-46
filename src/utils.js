import fs from 'fs';
import path from 'node:path';

export const getFile = (filePath) => fs.readFileSync(filePath, 'utf8');
export const getFormat = (filePath) => path.extname(filePath);
export const getPath = (filePath) => path.resolve(process.cwd(), filePath);
