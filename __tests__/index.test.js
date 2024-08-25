import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

import getDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
const getFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

test('find the differences between two json files', () => {
  const filepath1 = getFixturePath('../__fixtures__/obj1.json');
  const filepath2 = getFixturePath('../__fixtures__/obj2.json');
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
  const filepath1 = getFixturePath('../__fixtures__/obj3.yaml');
  const filepath2 = getFixturePath('../__fixtures__/obj4.yaml');
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

test('find the differences between two files that have nested structures', () => {
  const filepath1 = getFixturePath('../__fixtures__/file1.json');
  const filepath2 = getFixturePath('../__fixtures__/file2.json');
  const expected = `{
 common: {
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: null
  + setting4: blah blah
  + setting5: {
   key5: value5
  }
  setting6: {
   doge: {
    - wow: 
    + wow: so much
   }
     key: value
   + ops: vops
  }
 }
 group1: {
  - baz: bas
  + baz: bars
    foo: bar
  - nest: {
   key: value
  }
  + nest: str
 }
 - group2: {
  abc: 12345
  deep: {
   id: 45
  }
 }
 + group3: {
  deep: {
   id: {
    number: 45
   }
  }
  fee: 100500
 }
}`;
  const result = getDiff(filepath1, filepath2);
  expect(result).toEqual(expected);
});

test('find the differences between the two files, flat format', () => {
  const filepath1 = getFixturePath('../__fixtures__/file1.json');
  const filepath2 = getFixturePath('../__fixtures__/file2.json');
  const expectPlain = getFile('plain.txt');

  const result = getDiff(filepath1, filepath2, 'plain');
  expect(result).toEqual(expectPlain);
});

test('find the differences between the two files, json format', () => {
  const filepath1 = getFixturePath('../__fixtures__/file1.json');
  const filepath2 = getFixturePath('../__fixtures__/file2.json');
  const expectJson = getFile('json.txt');
  const result = getDiff(filepath1, filepath2, 'json');
  expect(result).toEqual(expectJson);
});
