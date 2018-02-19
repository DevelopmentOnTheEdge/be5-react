import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel   from 'rollup-plugin-babel'
import cjs     from 'rollup-plugin-commonjs'
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import image   from 'rollup-plugin-image';
import postcss from 'rollup-plugin-postcss'
import inject  from 'rollup-plugin-inject'

export default {
  input: 'src/scripts/be5/index.js',
  output: {
    file: 'dist/be5-react.js',
    format: 'iife'
  },
  plugins: [
    // nodeResolve(),
    // commonjs(),
    postcss({
      extract: true
    }),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [ [ 'es2015', { modules: false } ], 'react' ],
      plugins: [ 'external-helpers' ]
    }),
    cjs({
      exclude: 'node_modules/process-es6/**',
      include: [
        'node_modules/create-react-class/**',
        'node_modules/fbjs/**',
        'node_modules/object-assign/**',
        'node_modules/react/**',
        'node_modules/react-dom/**',
        'node_modules/prop-types/**'
      ]
    }),
    inject({
      include: '**/*.js',
      exclude: 'node_modules/**',
      jQuery: 'jquery',
    }),
    globals(),
    replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    resolve({
      browser: true,
      main: true
    }),
    image()
  ],
  sourcemap: true
}