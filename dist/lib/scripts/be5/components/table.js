'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _be = require('../be5');

var _be2 = _interopRequireDefault(_be);

var _changeDocument = require('../core/changeDocument');

var _changeDocument2 = _interopRequireDefault(_changeDocument);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _action = require('./action');

var _action2 = _interopRequireDefault(_action);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _tables = require('../services/tables');

var _tables2 = _interopRequireDefault(_tables);

var _numberFormat = require('number-format.js');

var _numberFormat2 = _interopRequireDefault(_numberFormat);

var _datatables = require('datatables');

var _datatables2 = _interopRequireDefault(_datatables);

require('../../../css/table.css');

var _reload2 = require('../../../images/reload.png');

var _reload3 = _interopRequireDefault(_reload2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OperationBox = _react2.default.createClass({ displayName: "OperationBox",
  onClick: function onClick(name, e) {
    if (!(0, _jquery2.default)(_reactDom2.default.findDOMNode(this.refs[name])).hasClass('disabled')) {
      var operation = this.props.operations.find(function (operation) {
        return operation.name === name;
      });
      if (!operation.requiresConfirmation || confirm(operation.title + "?")) {
        this.props.onOperationClick(name);
      }
    }
    e.preventDefault();
  },
  refreshEnablement: function refreshEnablement() {
    var _this2 = this;

    this.props.operations.forEach(function (operation) {
      var visible = false;
      switch (operation.visibleWhen) {
        case 'always':
          visible = true;
          break;
        case 'oneSelected':
          visible = _be2.default.tableState.selectedRows.length == 1;
          break;
        case 'anySelected':
          visible = _be2.default.tableState.selectedRows.length != 0;
          break;
        case 'hasRecords':
          visible = _this2.props.hasRows;
          break;
      }
      if (visible) {
        (0, _jquery2.default)(_reactDom2.default.findDOMNode(_this2.refs[operation.name])).addClass('enabled');
        (0, _jquery2.default)(_reactDom2.default.findDOMNode(_this2.refs[operation.name])).removeClass('disabled');
      } else {
        (0, _jquery2.default)(_reactDom2.default.findDOMNode(_this2.refs[operation.name])).addClass('disabled');
        (0, _jquery2.default)(_reactDom2.default.findDOMNode(_this2.refs[operation.name])).removeClass('enabled');
      }
    });
  },
  render: function render() {
    var _this3 = this;

    var splitWithSpaces = function splitWithSpaces(elements) {
      var out = [];
      (0, _underscore2.default)(elements).each(function (e) {
        if (out.length !== 0) {
          out.push(' ');
        }
        out.push(e);
      });
      return out;
    };
    var operations = this.props.operations.map(function (operation) {
      if (operation.isClientSide) {
        var action = _action2.default.parse(operation.action);
        var attrs = {
          key: operation.name,
          ref: operation.name,
          href: action.href,
          target: action.target,
          className: 'btn btn-secondary'
        };
        return _react2.default.createElement('a', attrs, operation.title);
      }
      return _react2.default.createElement('a', { key: operation.name, ref: operation.name, href: '', onClick: _this3.onClick.bind(_this3, operation.name), className: 'btn btn-secondary' }, operation.title);
    });

    if (this.props.operations.length == 0) {
      return _react2.default.createElement('div', null);
    }
    return _react2.default.createElement('div', { className: 'operationList' }, splitWithSpaces(operations));
  }
});

var QuickColumns = _react2.default.createClass({
  displayName: 'QuickColumns',


  getInitialState: function getInitialState() {
    return this.createStateFromProps(this.props);
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState(this.createStateFromProps(nextProps));
  },
  createStateFromProps: function createStateFromProps(props) {
    return { quickColumns: props.firstRow.map(function (col, idx) {
        if (col.options.quick) return { columnId: idx, visible: col.options.quick.visible == 'true' };else return null;
      }).filter(function (col) {
        return col !== null;
      })
    };
  },
  setTable: function setTable(_table) {
    this.setState({ table: _table });
  },
  quickHandleChange: function quickHandleChange(idx) {
    this.state.quickColumns[idx].visible = !this.state.quickColumns[idx].visible;
    this.forceUpdate();
  },
  render: function render() {
    var _this4 = this;

    if (this.state.quickColumns.length == 0) {
      return _react2.default.createElement('div', null);
    }
    if (this.state.table) {
      var dataTable = (0, _jquery2.default)(this.state.table).find('table').dataTable();
      var columnsCount = dataTable.fnSettings().aoColumns.length;
      this.state.quickColumns.forEach(function (col) {
        var columnId = col.columnId + (_this4.props.selectable ? 1 : 0);
        if (columnId < columnsCount) {
          var dtColumn = dataTable.api().column(columnId);
          if (dtColumn.visible) dtColumn.visible(col.visible);
        }
      });
    }

    var checks = this.state.quickColumns.map(function (cell, idx) {
      var _this5 = this;

      var column = this.props.columns[cell.columnId];
      var title = column.replace(/<br\s*[\/]?>/gi, " ");
      return _react2.default.createElement(
        'span',
        { key: idx },
        _react2.default.createElement('input', { id: "quick" + idx, type: 'checkbox', checked: cell.visible, onChange: function onChange() {
            return _this5.quickHandleChange(idx);
          } }),
        _react2.default.createElement(
          'label',
          { htmlFor: "quick" + idx, className: 'rowIndex' },
          title,
          ' '
        )
      );
    }.bind(this));

    return _react2.default.createElement(
      'div',
      { id: 'quickColumns' },
      _react2.default.createElement(
        'span',
        null,
        '\u0414\u0440\u0443\u0433\u0438\u0435 \u043A\u043E\u043B\u043E\u043D\u043A\u0438:'
      ),
      checks
    );
  }
});

var formatCell = function formatCell(data, options) {
  if (!Array.isArray(data)) {
    if (data === '') {
      if (options && options.blankNulls && options.blankNulls.value) return options.blankNulls.value;
    }
  } else {
    data = data.map(function (row) {
      return row.join(', ');
    }).join('<br/>');
  }

  if (options) {
    if (options.format) {
      var el = (0, _jquery2.default)('<div></div>');
      el.html(data);
      if ((0, _jquery2.default)('a', el).length == 1) {
        data = (0, _jquery2.default)('a', el).text((0, _numberFormat2.default)(options.format.mask, (0, _jquery2.default)('a', el).text()));
      } else {
        data = (0, _numberFormat2.default)(options.format.mask, data);
      }
    }
    if (options.css || options === 'th') {
      var wrap = (0, _jquery2.default)('<div>');
      if (options.css && options.css.class) wrap.addClass(options.css.class);
      if (options === 'th') wrap.addClass("ta-center td-strong");
      data = wrap.html(data);
    }
  }
  if (data instanceof jQuery) {
    data = (0, _jquery2.default)('<div>').append((0, _jquery2.default)(data).clone()).html();
  }
  return data;
};

var TableBox = _react2.default.createClass({

  displayName: 'TableBox',

  componentDidMount: function componentDidMount() {
    if (this.refs.table) this.applyTableStyle(_reactDom2.default.findDOMNode(this.refs.table));

    this._refreshEnablementIfNeeded();
    this._loadCountIfNeeded();
  },
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(nextProps) !== JSON.stringify(this.props) || JSON.stringify(nextState) !== JSON.stringify(this.state);
  },
  componentDidUpdate: function componentDidUpdate() {
    if (this.refs.table) this.applyTableStyle(_reactDom2.default.findDOMNode(this.refs.table));

    this._loadCountIfNeeded();
  },
  onOperationClick: function onOperationClick(name) {
    _be2.default.url.set(_be2.default.url.create('form', [this.props.category, this.props.page, name], this.props.parameters));
  },
  onSelectionChange: function onSelectionChange() {
    this._refreshEnablementIfNeeded();

    if (this.props.hasOwnProperty('callbacks') && this.props.callbacks !== undefined && this.props.callbacks.hasOwnProperty('onSelectionChange')) {
      this.props.callbacks.onSelectionChange(_be2.default.tableState.selectedRows);
    }
  },
  applyTableStyle: function applyTableStyle(node) {
    var _this6 = this;

    // see http://datatables.net/examples/index
    (0, _jquery2.default)(node).empty();
    if (this.props.columns.length == 0) return;

    var _this = this;
    _be2.default.tableState.selectedRows = [];

    var thead = (0, _jquery2.default)('<thead>');
    var theadrow = (0, _jquery2.default)('<tr>').appendTo(thead);
    var tbody = (0, _jquery2.default)('<tbody>');
    var tfoot = (0, _jquery2.default)('<tfoot>');
    var tfootrow = (0, _jquery2.default)('<tr>').appendTo(tfoot);
    var hasCheckBoxes = this.props.selectable;
    var editable = this.props.operations.filter(function (op) {
      return op.name === 'Edit';
    }).length === 1;
    var columnIndexShift = 0;

    if (hasCheckBoxes) {
      theadrow.append((0, _jquery2.default)("<th>").text("#"));
      tfootrow.append((0, _jquery2.default)("<th>").text("#"));
      columnIndexShift = 1;
    }

    this.props.columns.forEach(function (column, idx) {
      var title = (typeof column === 'undefined' ? 'undefined' : _typeof(column)) === 'object' ? column.title : column;
      theadrow.append((0, _jquery2.default)("<th>").html(formatCell(title, 'th')));
      tfootrow.append((0, _jquery2.default)("<th>").html(formatCell(title, 'th')));
    });
    this.props.rows.forEach(function (row, rowId, rows) {
      var tr = (0, _jquery2.default)('<tr>');
      row.cells.forEach(function (cell, idx) {
        tr.append((0, _jquery2.default)('<td>').html(formatCell(cell.content, cell.options)));
      });
      if (hasCheckBoxes) {
        tr.prepend((0, _jquery2.default)('<td>').text(row.id));
      }
      tbody.append(tr);
    });

    var tableDiv = (0, _jquery2.default)('<table class="display compact" cellspacing="0"/>').append(thead).append(tbody).append(this.props.rows.length > 10 ? tfoot : '').appendTo(node);

    var lengths = [10, 20, 50, 100, 500, 1000];
    var pageLength = this.props.length;

    if (lengths.indexOf(pageLength) == -1) {
      lengths.push(pageLength);
      lengths.sort(function (a, b) {
        return a - b;
      });
    }

    var language = null;
    if (_be2.default.locale.value != 'en') {
      language = _be2.default.messages.dataTables;
    }

    var tableConfiguration = {
      processing: true,
      serverSide: true,
      language: language,
      searching: false,
      autoWidth: false,
      aaSorting: [],
      ajax: {
        url: _be2.default.net.url('document/moreRows'),
        data: {
          entity: this.props.category,
          query: this.props.page,
          values: _be2.default.net.paramString(this.props.parameters),
          selectable: this.props.selectable,
          totalNumberOfRows: this.props.totalNumberOfRows
        },
        dataSrc: function dataSrc(d) {
          if (d.type === "error") {
            _be2.default.log.error(d.value.code + "\n" + d.value.message);
          } else {
            for (var i = 0; i < d.data.length; i++) {
              for (var j = 0; j < d.data[0].length - columnIndexShift; j++) {
                d.data[i][j + columnIndexShift] = formatCell(d.data[i][j + columnIndexShift].content, d.data[i][j + columnIndexShift].options);
              }
            }
          }
          return d.data;
        }
      },
      lengthMenu: lengths,
      pageLength: pageLength,
      // This both tells
      // that the first bunch of data is already loaded (so no request is required), and
      // which is the total length of the result.
      // See https://datatables.net/reference/option/deferLoading
      deferLoading: this.props.totalNumberOfRows,
      columnDefs: [{
        render: function render(data, type, row, meta) {
          if (!hasCheckBoxes) {
            return row[0]; // default behavior
          }
          var val = row[0];
          var id = "row-" + val + "-checkbox";
          var display = meta.row + 1;
          if (editable) {
            display = '<a href="#!' + _be2.default.url.create('form', [_this6.props.category, _this6.props.page, 'Edit'], { selectedRows: val }) + '">' + display + '</a>';
          }
          // Pure HTML! Have no idea how to convert some react.js to string.
          return '\
                <input id="{id}" type="checkbox" class="rowCheckbox"></input>\
                <label for="{id}" class="rowIndex"><span class="checkBox" ></span>{val}</label>'.replace('{id}', id).replace('{id}', id).replace('{val}', display);
        },
        targets: 0
      }, {
        render: function render(data, type, row) {
          if (type === 'display') {
            var container = (0, _jquery2.default)('<div/>').html(formatCell(data));
            //be5.ui.convertLinks(container);
            return container.html();
          }
          return data;
        },
        targets: "_all"
      }],
      createdRow: function createdRow(row, data, index) {
        // see http://datatables.net/examples/advanced_init/row_callback.html
        (0, _jquery2.default)('input', row).change(function () {
          var rowId = data[0];
          var checked = this.checked;
          if (checked && _jquery2.default.inArray(rowId, _be2.default.tableState.selectedRows) == -1) {
            _be2.default.tableState.selectedRows.push(rowId);
          } else if (!checked && _jquery2.default.inArray(rowId, _be2.default.tableState.selectedRows) != -1) {
            _be2.default.tableState.selectedRows.splice(_jquery2.default.inArray(rowId, _be2.default.tableState.selectedRows), 1);
          }
          _this.onSelectionChange();
        });
      }
    };
    var groupingColumn = null;
    var nColumns = this.props.rows[0].cells.length;
    for (var i = 0; i < nColumns; i++) {
      var column = this.props.rows[0].cells[i];
      if ((typeof column === 'undefined' ? 'undefined' : _typeof(column)) === 'object') {
        if ('options' in column) {
          if ('grouping' in column.options) {
            groupingColumn = i;
          }
        }
      }
    }

    var hideControls = function hideControls() {
      if ((0, _jquery2.default)(_this.refs.table).find('.paging_simple_numbers span .paginate_button') && (0, _jquery2.default)(_this.refs.table).find('.paging_simple_numbers span .paginate_button').length > 1) {
        (0, _jquery2.default)(_this.refs.table).find('.dataTables_length').show();
        (0, _jquery2.default)(_this.refs.table).find('.paging_simple_numbers').show();
      } else {
        (0, _jquery2.default)(_this.refs.table).find('.dataTables_length').hide();
        (0, _jquery2.default)(_this.refs.table).find('.paging_simple_numbers').hide();
      }
    };

    if (groupingColumn !== null) {
      var resultGroupingColumn = columnIndexShift + groupingColumn;
      tableConfiguration.columnDefs.push({ visible: false, targets: resultGroupingColumn });
      var drawGrouping = function drawGrouping(api) {
        var rows = api.rows({ page: 'current' }).nodes();
        var last = null;

        api.column(resultGroupingColumn, { page: 'current' }).data().each(function (group, i) {
          if (last !== group) {
            (0, _jquery2.default)(rows).eq(i).before('<tr class="table-group"><td colspan="' + nColumns + '">' + group + '</td></tr>');
            last = group;
          }
        });
      };
    }

    tableConfiguration.drawCallback = function (settings) {
      if (groupingColumn !== null) drawGrouping(this.api());
      hideControls();
    };

    tableDiv.dataTable(tableConfiguration);

    this.refs.quickColumns.setTable(this.refs.table);

    this.onSelectionChange();
  },
  render: function render() {
    if (this.props.columns.length == 0) {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(OperationBox, { ref: 'operations', operations: this.props.operations, onOperationClick: this.onOperationClick, hasRows: this.props.rows.length != 0 }),
        _be2.default.messages.emptyTable
      );
    }

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(OperationBox, { ref: 'operations', operations: this.props.operations, onOperationClick: this.onOperationClick, hasRows: this.props.rows.length != 0 }),
      _react2.default.createElement(QuickColumns, { ref: 'quickColumns', columns: this.props.columns, firstRow: this.props.rows[0].cells, table: this.refs.table, selectable: this.props.selectable }),
      _react2.default.createElement(
        'div',
        { className: 'scroll' },
        _react2.default.createElement('div', { ref: 'table' })
      )
    );
  },
  _loadCountIfNeeded: function _loadCountIfNeeded() {
    var _this7 = this;

    if (this.props.embedded) {
      // FIXME actually this should work even if the component is embedded
      return;
    }

    if (this.props.value.type === 'table' && !this.props.totalNumberOfRows && this.props.totalNumberOfRows != 0) {
      _be2.default.net.request('document/count', this.props.value.requestParams, function (res) {
        var documentState = {
          time: Date.now(),
          type: 'table',
          value: _underscore2.default.extend({}, _this7.props.value, { totalNumberOfRows: res.value })
        };

        (0, _changeDocument2.default)(documentState);
      });
    }
  },
  _refreshEnablementIfNeeded: function _refreshEnablementIfNeeded() {
    if (this.refs !== undefined && this.refs.operations !== undefined) {
      this.refs.operations.refreshEnablement();
    }
  }
});

var Table = _react2.default.createClass({
  propTypes: {
    value: _react2.default.PropTypes.object.isRequired
  },

  getInitialState: function getInitialState() {
    return { runReload: "" };
  },


  displayName: 'Table',

  render: function render() {
    var value = this.props.value;
    var reloadClass = "table-reload float-xs-right " + this.state.runReload;

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'span',
        { onClick: this._reload, className: reloadClass },
        _react2.default.createElement('img', { src: _reload3.default, alt: _be2.default.messages.reload, title: _be2.default.messages.reload })
      ),
      _react2.default.createElement(
        'h1',
        null,
        value.title
      ),
      _react2.default.createElement(TableBox, {
        ref: 'tableBox',
        category: value.category,
        page: value.page,
        operations: value.operations,
        selectable: value.selectable,
        columns: value.columns,
        rows: value.rows,
        length: value.length,
        parameters: value.parameters,
        totalNumberOfRows: value.totalNumberOfRows,
        hasAggregate: value.hasAggregate,
        callbacks: value.callbacks,
        embedded: value.embedded,
        value: value
      })
    );
  },
  componentWillUpdate: function componentWillUpdate() {
    if (this.state.runReload != "") this.setState({ runReload: "" });
  },
  _reload: function _reload() {
    var value = this.props.value;
    this.setState({ runReload: "active" });
    _tables2.default.load({ entity: value.category, query: value.page || 'All records', params: value.parameters, options: { embedded: false } }, _changeDocument2.default);
  }
});

var _default = Table;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(OperationBox, 'OperationBox', 'src/scripts/be5/components/table.js');

  __REACT_HOT_LOADER__.register(QuickColumns, 'QuickColumns', 'src/scripts/be5/components/table.js');

  __REACT_HOT_LOADER__.register(formatCell, 'formatCell', 'src/scripts/be5/components/table.js');

  __REACT_HOT_LOADER__.register(TableBox, 'TableBox', 'src/scripts/be5/components/table.js');

  __REACT_HOT_LOADER__.register(Table, 'Table', 'src/scripts/be5/components/table.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/components/table.js');
}();

;