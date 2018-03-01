import nodeResolve from 'rollup-plugin-node-resolve';
import babel       from 'rollup-plugin-babel'
import commonjs    from 'rollup-plugin-commonjs'
import replace     from 'rollup-plugin-replace'
import resolve     from 'rollup-plugin-node-resolve'
import imageBase64 from 'rollup-plugin-image-base64';
import pkg         from './package.json'

const external = Object.keys(pkg.dependencies || {});


export default {
  input: 'src/scripts/be5/index.js',
  external: external,
  output: {
    file: pkg.main,
    format: 'es'
  },
  name: pkg.main,
  plugins: [
    nodeResolve(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [ [ 'es2015', { modules: false } ], 'react' ],
      plugins: [ 'external-helpers' ]
    }),
    commonjs(),
    replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    resolve({
      module: true,
      jsnext: true,
      main: true,
      browser: true,
    }),
    imageBase64()
  ]
}