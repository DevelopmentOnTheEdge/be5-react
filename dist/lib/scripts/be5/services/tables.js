'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _be = require('../be5');

var _be2 = _interopRequireDefault(_be);

var _documentUtils = require('../core/documentUtils');

var _documentUtils2 = _interopRequireDefault(_documentUtils);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _preconditions = require('../preconditions');

var _preconditions2 = _interopRequireDefault(_preconditions);

var _table = require('../components/table');

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createDefaultOptions = function createDefaultOptions() {
  return {
    embedded: true
  };
};

var _default = {
  load: function load(params, callback) {
    _preconditions2.default.passed(params.entity);
    _preconditions2.default.passed(params.query);

    var options = _underscore2.default.extend(createDefaultOptions(), params.options);
    var requestParams = { entity: params.entity, query: params.query, values: _be2.default.net.paramString(params.params) };

    _be2.default.net.request('document', requestParams, function (documentState) {
      documentState.time = Date.now();
      if (documentState.type === 'table') {
        documentState.value.type = 'table';
        documentState.value.requestParams = requestParams;
      } else {
        documentState.value.embedded = true;
      }
      documentState.value = _underscore2.default.extend({}, documentState.value, options);
      documentState = _documentUtils2.default.createDocument(documentState);

      callback({ component: _table2.default, value: documentState.value });
    });
  }
};
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(createDefaultOptions, 'createDefaultOptions', 'src/scripts/be5/services/tables.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/services/tables.js');
}();

;