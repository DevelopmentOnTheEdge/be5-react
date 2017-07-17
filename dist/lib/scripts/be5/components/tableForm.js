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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableForm = _react2.default.createClass({
  displayName: 'TableForm',

  onSelectionChange: function onSelectionChange() {
    this.props.value.callbacks.onSelectionChange(_be2.default.tableState.selectedRows);
  },
  render: function render() {
    var callbacks = {
      onSelectionChange: function (selection) {
        var action = 'Edit';
        var temp = {
          category: this.props.value.category,
          page: this.props.value.page,
          action: action,
          selectedRows: selection,
          hideActions: true,
          isEmbedded: true
        };
        if (selection.length == 0) {
          temp.title = 'Empty Selection';
          temp.fields = [];
          this.refs.form.replaceState(temp);
        } else if (selection.length > 1) {
          temp.title = 'Multiple Selection';
          temp.fields = [];
          this.refs.form.replaceState(temp);
        } else {
          var category = this.props.value.category;
          var page = this.props.value.page;
          var data = { entity: category, query: page, operation: action, selectedRows: selection.join() };
          var that = this;
          _be2.default.net.request('form', data, function (data) {
            data.value.showCancel = false;
            that.refs.form.replaceState(data.value);
          });
        }
      }.bind(this)
    };
    this.props.value.callbacks = callbacks;
    return _react2.default.DOM.div({ className: "tableFormSplitter" }, _be2.default.ui.createDocument('table', this.props.value), _be2.default.ui.createDocument('form', { title: 'Empty Selection', fields: [], showCancel: false }));
  }
});

//be5.registerAction('tableForm', function(entity, query, params) {
//  if(query === undefined)
//    query = 'All records';
//  if(params === undefined)
//    params = {};
//  var fullParams = { category: entity, page: query };
//  $.extend(fullParams, params);
//  be5.net.request('document', fullParams, function(value) {
//      value.type = 'tableForm';
//      changeDocument(value);
//  });
//});
//
//be5.ui.registerDocumentType('tableForm', function(value) {
//  return ( React.createElement(TableForm, {ref: "tableForm", value: value}) );
//});

var _default = TableForm;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(TableForm, 'TableForm', 'src/scripts/be5/components/tableForm.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/components/tableForm.js');
}();

;