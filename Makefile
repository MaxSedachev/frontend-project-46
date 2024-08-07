make install:
	npm ci
make link:
	npx eslint .
make test:
	npm test
make test-coverage:
	npm test -- --coverage --coverageProvider=v8