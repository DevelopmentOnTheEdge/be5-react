'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _be = require('../be5');

var _be2 = _interopRequireDefault(_be);

var _changeDocument = require('../core/changeDocument');

var _changeDocument2 = _interopRequireDefault(_changeDocument);

var _forms = require('../services/forms');

var _forms2 = _interopRequireDefault(_forms);

var _form = require('../components/form');

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(entity, query, operation, operationParams) {

  var selectedRows = operationParams === undefined || operationParams.selectedRows === undefined ? _be2.default.tableState.selectedRows.join() : operationParams.selectedRows;
  if (operationParams !== undefined && operationParams.selectedRows !== undefined) {
    delete operationParams.selectedRows;
  }
  var params = {
    entity: entity,
    query: query || 'All records',
    operation: operation,
    values: _be2.default.net.paramString(operationParams),
    selectedRows: selectedRows
  };
  _forms2.default.load(params, _form.performOperationResult);
};

exports.default = _default;
;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/actions/form.js');
}();

;