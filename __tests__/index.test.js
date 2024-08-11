import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import getDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.resolve(__dirname, filename);

test('find the differences between two json files', () => {
  const filepath1 = getFixturePath('../__fixtures__/file1.json');
  const filepath2 = getFixturePath('../__fixtures__/file2.json');
  const expected = `{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true
}`;
  const result = getDiff(filepath1, filepath2);
  expect(result).toEqual(expected);
});

test('find the differences between two yaml files', () => {
  const filepath1 = getFixturePath('../__fixtures__/file3.yaml');
  const filepath2 = getFixturePath('../__fixtures__/file4.yaml');
  const expected = `{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true
}`;
  const result = getDiff(filepath1, filepath2);
  expect(result).toEqual(expected);
});
