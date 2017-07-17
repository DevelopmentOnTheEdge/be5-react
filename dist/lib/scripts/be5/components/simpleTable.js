'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _be = require('../be5');

var _be2 = _interopRequireDefault(_be);

var _tables = require('../services/tables');

var _tables2 = _interopRequireDefault(_tables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _react2.default.createClass({
  propTypes: {
    entity: _react2.default.PropTypes.string.isRequired,
    query: _react2.default.PropTypes.string.isRequired,
    responsive: _react2.default.PropTypes.bool,
    showHead: _react2.default.PropTypes.bool
  },

  displayName: 'SimpleTable',

  getInitialState: function getInitialState() {
    return { loading: true };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    _tables2.default.load(this.props, function (data) {
      if (data.type !== 'error') {
        _this.setState({ loading: false, value: data.value });
      }
    });
  },
  render: function render() {
    if (this.state.loading) {
      return _react2.default.createElement(
        'p',
        { className: 'card-text' },
        _be2.default.messages.loading
      );
    }
    var klass = this.props.responsive ? 'table table-responsive' : 'table';
    var tds = function tds(cells) {
      var key = 0;
      return cells.map(function (cell) {
        return _react2.default.createElement(
          'td',
          { key: key++ },
          cell
        );
      });
    };
    var trs = function trs(rows) {
      var key = 0;
      return rows.map(function (row) {
        return _react2.default.createElement(
          'tr',
          { key: key++ },
          tds(row.cells)
        );
      });
    };
    var head = this.props.showHead ? this._getHead() : undefined;
    return _react2.default.createElement(
      'table',
      { className: klass },
      head,
      _react2.default.createElement(
        'tbody',
        null,
        trs(this.state.value.rows)
      )
    );
  },
  _getHead: function _getHead() {
    var ths = function ths(columns) {
      var key = 0;
      return columns.map(function (column) {
        return _react2.default.createElement(
          'th',
          { key: key++ },
          column
        );
      });
    };
    return _react2.default.createElement(
      'thead',
      null,
      _react2.default.createElement(
        'tr',
        null,
        ths(this.state.value.columns)
      )
    );
  }
});

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/components/simpleTable.js');
}();

;