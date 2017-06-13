const buildNumber = 1;
const systemLocate = System.locate;

System.locate = function(load) {
  return Promise.resolve(systemLocate.call(this, load)).then(function(address) {
    if(address.indexOf("https://unpkg.com") === -1)
      return address + '?build=' + buildNumber;
    else
      return address;
  });
};

System.config({
  baseURL: '.',
  defaultJSExtensions: true,
  transpiler: 'none',
  paths: {
    'lib-be5:*':'/be5/lib/*.js',
    'be5:*':    '/be5/scripts/*.js'
  },
  packageConfigPaths: ['../../node_modules/*/package.json'],
  meta: {
    'datetimepicker': {
      format: 'global',
      deps: ['jquery']
    },
    'fittext': {
      format: 'global',
      deps: ['jquery']
    },
    'react-select': {
      format: 'global',
      globals: {
        React: 'react',
        ReactDOM: 'react-dom',
        AutosizeInput: 'react-input-autosize',
        classNames: 'classNames'
      }
    },
    'react-input-autosize': {
      format: 'global',
      globals: {
        React: 'react'
      }
    }
  },
  map: {
    'bootstrap': 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha/js/bootstrap.min.js',
    'datatables': 'https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.10/js/jquery.dataTables.min.js',
    'datetimepicker': 'https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.4.5/jquery.datetimepicker.min.js',
    'fittext': 'https://cdnjs.cloudflare.com/ajax/libs/FitText.js/1.2.0/jquery.fittext.min.js',
    'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js',
    'tether': 'https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js',
    'jqueryui': 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js',
    'react': 'https://cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react.js',
    'react-dom': 'https://cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react-dom.js',
    'prop-types': 'https://unpkg.com/prop-types/prop-types.min.js',
    'react-classset': 'lib-be5:react-classset/classSet',
    'classNames': 'https://cdnjs.cloudflare.com/ajax/libs/classnames/2.2.5/index.min.js',
    'react-input-autosize': 'lib-be5:react-input-autosize/dist/react-input-autosize',
    'react-select': 'https://cdnjs.cloudflare.com/ajax/libs/react-select/1.0.0-beta14/react-select.js',
    'underscore': 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js',
    'number-format.js': 'lib-be5:number-format.js/lib/format.min',
    'json-pointer': 'lib-be5:json-pointer-rfc6901/dist/json-pointer.node',
    'beanexplorer-react': 'lib-be5:beanexplorer-react/build/beanexplorer-react',

    'be5':          'be5:be5',
    'main':         'be5:be5/main',
  }
});
