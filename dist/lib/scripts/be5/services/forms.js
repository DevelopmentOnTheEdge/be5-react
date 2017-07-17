'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _be = require('../be5');

var _be2 = _interopRequireDefault(_be);

var _preconditions = require('../preconditions');

var _preconditions2 = _interopRequireDefault(_preconditions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  load: function load(params, callback) {
    _preconditions2.default.passed(params.entity);
    _preconditions2.default.passed(params.query);
    _preconditions2.default.passed(params.operation);

    var requestParams = {
      entity: params.entity,
      query: params.query,
      operation: params.operation,
      values: params.values || '',
      selectedRows: params.selectedRows || ''
    };
    _be2.default.net.request('form', requestParams, callback);
  }
};
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/services/forms.js');
}();

;