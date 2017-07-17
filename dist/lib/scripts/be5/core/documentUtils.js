'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createIllegalArgumentError = function createIllegalArgumentError() {
  return {
    name: 'IllegalArgumentError',
    message: ''
  };
};

var getColumnName = function getColumnName(column) {
  return typeof column === 'string' ? column : column.name;
};

var _toRows = function _toRows(table) {
  if (table.type && table.type === 'table') {
    table = table.value;
  }

  return table.rows.map(function (row) {
    var resultRow = { id: row.id };
    for (var i = 0; i < row.cells.length; i++) {
      resultRow[getColumnName(table.columns[i])] = row.cells[i];
    }
    return resultRow;
  });
};

var getSortableColumns = function getSortableColumns(table) {
  if (table.type && table.type === 'table') {
    table = table.value;
  }

  return table.columns.filter(function (column) {
    return !(column.options && column.options.nosort);
  });
};

var _toRow = function _toRow(table) {
  var rows = _toRows(table);
  if (rows.length !== 1) {
    throw createIllegalArgumentError();
  }
  return rows[0];
};

var createDocument = function createDocument(resource) {
  return _underscore2.default.extend({
    toRow: function toRow() {
      return _toRow(this);
    },
    toRows: function toRows() {
      return _toRows(this);
    }
  }, resource);
};

var _default = {
  toRows: _toRows,
  toRow: _toRow,
  createDocument: createDocument,
  getSortableColumns: getSortableColumns
};
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(createIllegalArgumentError, 'createIllegalArgumentError', 'src/scripts/be5/core/documentUtils.js');

  __REACT_HOT_LOADER__.register(getColumnName, 'getColumnName', 'src/scripts/be5/core/documentUtils.js');

  __REACT_HOT_LOADER__.register(_toRows, 'toRows', 'src/scripts/be5/core/documentUtils.js');

  __REACT_HOT_LOADER__.register(getSortableColumns, 'getSortableColumns', 'src/scripts/be5/core/documentUtils.js');

  __REACT_HOT_LOADER__.register(_toRow, 'toRow', 'src/scripts/be5/core/documentUtils.js');

  __REACT_HOT_LOADER__.register(createDocument, 'createDocument', 'src/scripts/be5/core/documentUtils.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/core/documentUtils.js');
}();

;