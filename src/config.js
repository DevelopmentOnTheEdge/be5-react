const buildNumber = 1;
const systemLocate = System.locate;

System.locate = function(load) {
  return Promise.resolve(systemLocate.call(this, load)).then(function(address) {
    return address + '?build=' + buildNumber;
  });
};

System.config({
  baseURL: '.',
  defaultJSExtensions: true,
  transpiler: 'none',
  paths: {
    '*': 'scripts/*.js',
    'lib:*': 'lib/*.js'
  },
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
  /*
  map: {
    'bootstrap': 'lib:bootstrap/dist/js/bootstrap.min',
    'datatables': 'lib:datatables/media/js/jquery.dataTables.min',
    'datetimepicker': 'lib:datetimepicker/jquery.datetimepicker', // no minified version
    'jquery': 'lib:jquery/dist/jquery.min',
    'jqueryui': 'lib:jquery-ui/jquery-ui.min',
    'react': 'lib:react/react.min',
    'react-dom': 'lib:react/react-dom.min',
    'react-classset': 'lib:react-classset/classSet',
    //'twbs/bootstrap': 'lib:bootstrap/dist/js/bootstrap.min',
    'underscore': 'lib:underscore/underscore-min',
    'fittext': 'lib:jquery.fittext'
  }
  */
  map: {
    'bootstrap': 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha/js/bootstrap.min.js',
    'datatables': 'https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.10/js/jquery.dataTables.min.js',
    'datetimepicker': 'https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.4.5/jquery.datetimepicker.min.js',
    'fittext': 'https://cdnjs.cloudflare.com/ajax/libs/FitText.js/1.2.0/jquery.fittext.min.js',
    'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js',
    'jqueryui': 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js',
    'react': 'https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react.min.js',
    'react-dom': 'https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react-dom.min.js',
    'react-classset': 'lib:react-classset/classSet',
    'classNames': 'https://cdnjs.cloudflare.com/ajax/libs/classnames/2.2.5/index.min.js',
    'react-input-autosize': 'lib:react-input-autosize/react-input-autosize',
    'react-select': 'https://cdnjs.cloudflare.com/ajax/libs/react-select/1.0.0-beta14/react-select.js',
    'underscore': 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js',
    'javascript-number-formatter': 'lib:javascript-number-formatter/lib/format.min'
  }
});
