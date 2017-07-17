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

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormTable = _react2.default.createClass({
  displayName: 'FormTable',

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'formTableSplitter' },
      _be2.default.ui.createDocument('form', _underscore2.default.extend({}, this.props.form, { showCancel: false })),
      _be2.default.ui.createDocument('table', this.props.table)
    );
  }
}); /*
     * depends on tables and forms dynamically using createDocument
     */


_be2.default.ui.registerDocumentType('formTable', function (value) {
  return _react2.default.createElement(FormTable, value);
});

var _default = FormTable;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(FormTable, 'FormTable', 'src/scripts/be5/components/formTable.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/components/formTable.js');
}();

;