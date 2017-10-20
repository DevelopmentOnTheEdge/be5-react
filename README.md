# be5-react
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]

> React client UI for be5 server api

## Install
```js
npm install be5-react
```
Or just copy **build** directory into the **webapp** of your be5-application.

### Build
```sh
npm install
npm run build-min
npm run build
```

### Development
[local-web-server](https://github.com/lwsjs/local-web-server) is used for proxy api.

```sh
$ npm start //or run you be5-application
$ npm run dev
serving at http://localhost:8888
```

### Tests
Test targets:
```sh
$ npm test
$ npm run watch
$ npm run coverage
```


[npm-url]: https://npmjs.org/package/be5-react
[npm-image]: https://img.shields.io/npm/v/generator-badges.svg?style=flat-square

[travis-url]: https://travis-ci.org/DevelopmentOnTheEdge/be5-react
[travis-image]: https://img.shields.io/travis/DevelopmentOnTheEdge/be5-react/master.svg?style=flat-square

[coveralls-url]: https://coveralls.io/github/DevelopmentOnTheEdge/be5-react
[coveralls-image]: https://img.shields.io/coveralls/DevelopmentOnTheEdge/be5-react/master.svg?style=flat-square