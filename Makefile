make install:
	npm ci
make link:
	npx eslint .
make test:
	npm test
make test-coverage:
	npm test -- --coverage --coverageProvider=v8
make gendiff:
	node bin/gendiff __fixtures__/file1.json __fixtures__/file2.json