'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _changeDocument = require('../core/changeDocument');

var _changeDocument2 = _interopRequireDefault(_changeDocument);

var _tables = require('../services/tables');

var _tables2 = _interopRequireDefault(_tables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(entity, query, params) {

  _tables2.default.load({ entity: entity, query: query || 'All records', params: params, options: { embedded: false } }, _changeDocument2.default);
};

exports.default = _default;
;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/actions/table.js');
}();

;