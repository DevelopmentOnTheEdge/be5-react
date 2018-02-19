import nodeResolve from 'rollup-plugin-node-resolve';
import babel    from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import image   from 'rollup-plugin-image';
import postcss from 'rollup-plugin-postcss'
//import external from 'rollup-plugin-peer-deps-external'
//import globals from 'rollup-plugin-node-globals'
//import inject  from 'rollup-plugin-inject'

const external = Object.keys(require('./package.json').dependencies || {});

import pkg from './package.json'

const file = 'dist/lib/be5-react.es.js';

export default {
  input: 'src/scripts/be5/index.js',
  external: external,
  output: [
    {
      file: pkg.main,
      format: 'umd'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  name: file,
  plugins: [
    //external(),
    nodeResolve(),
    postcss({ extract: true }),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [ [ 'es2015', { modules: false } ], 'react' ],
      plugins: [ 'external-helpers' ]
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    image()
  ],
  sourcemap: true
}