import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

import { getDiff } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
const getFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

test('find the differences between two json files', () => {
  const filepath1 = getFixturePath('../__fixtures__/obj1.json');
  const filepath2 = getFixturePath('../__fixtures__/obj2.json');
  const expectJson1 = getFile('json1.txt');
  const result = getDiff(filepath1, filepath2);
  expect(result).toEqual(expectJson1);
});

test('find the differences between two yaml files', () => {
  const filepath1 = getFixturePath('../__fixtures__/obj3.yaml');
  const filepath2 = getFixturePath('../__fixtures__/obj4.yaml');
  const expectYaml = getFile('yaml.txt');
  const result = getDiff(filepath1, filepath2);
  expect(result).toEqual(expectYaml);
});

test('find the differences between two files that have nested structures', () => {
  const filepath1 = getFixturePath('../__fixtures__/file1.json');
  const filepath2 = getFixturePath('../__fixtures__/file2.json');
  const expectNestedStructures = getFile('nestedStructures.txt');

  const result = getDiff(filepath1, filepath2);
  expect(result).toEqual(expectNestedStructures);
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
  const expectJson2 = getFile('json2.txt');
  const result = getDiff(filepath1, filepath2, 'json');
  expect(result).toEqual(expectJson2);
});
