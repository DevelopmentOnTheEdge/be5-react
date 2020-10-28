import nodeResolve from '@rollup/plugin-node-resolve';
import babel       from '@rollup/plugin-babel'
import commonjs    from '@rollup/plugin-commonjs'
import replace     from '@rollup/plugin-replace'
import resolve     from '@rollup/plugin-node-resolve'
import image       from '@rollup/plugin-image';
import pkg         from './package.json'

const external = Object.keys(pkg.dependencies || {});

external.push('react-transition-group/Transition');
external.push('brace');
external.push('brace/mode/sql');
external.push('brace/theme/xcode');
external.push('brace/ext/language_tools');

export default {
  input: 'src/scripts/be5/index.js',
  external: external,
  output: {
    file: pkg.main,
    format: 'es'
  },
  // name: pkg.main,
  plugins: [
    nodeResolve(),
    babel({
      babelrc: false,
      babelHelpers: 'inline',
      exclude: 'node_modules/**',
      presets: [ [ '@babel/env', { modules: false } ], '@babel/react' ],
      // todo make babelHelpers: external, now insert undefinied var babelHelpers
      // plugins: [ '@babel/external-helpers' ]
    }),
    commonjs(),
    replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    resolve({
      module: true,
      jsnext: true,
      main: true,
      browser: true,
    }),
    image()
  ]
}
