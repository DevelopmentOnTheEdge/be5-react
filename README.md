# be5-react

[![NPM Version](https://img.shields.io/npm/v/be5-react.svg?branch=master)](https://www.npmjs.com/package/be5-react) 
[![Build Status](https://travis-ci.com/DevelopmentOnTheEdge/be5-react.svg?branch=master)](https://travis-ci.com/DevelopmentOnTheEdge/be5-react) 
[![dependencies Status](https://david-dm.org/DevelopmentOnTheEdge/be5-react/status.svg)](https://david-dm.org/DevelopmentOnTheEdge/be5-react)
[![Coverage Status](https://coveralls.io/repos/github/DevelopmentOnTheEdge/be5-react/badge.svg?branch=master)](https://coveralls.io/github/DevelopmentOnTheEdge/be5-react?branch=master) 

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
[local-web-server](https://github.com/lwsjs/local-web-server) is used for proxy api. (old/not updated)

```sh
$ npm run dev //or run you be5-application
$ npm start
serving at http://localhost:8888
```

### Tests
Test targets:
```sh
$ npm test
$ npm run watch
$ npm run coverage
```

### Deploy
```sh
sh build.sh
npm run up
```
