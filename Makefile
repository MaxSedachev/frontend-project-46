make install:
	npm ci
make lint:
	npx eslint .
make test:
	npm test
make test-coverage:
	npm test -- --coverage --coverageProvider=v8
make gendiff:
	node bin/gendiff __fixtures__/obj1.json __fixtures__/obj2.json