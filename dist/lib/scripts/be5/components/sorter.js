'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _react2.default.createClass({
  displayName: 'Sorter',

  propTypes: {
    /**
     * An array of columns with name and title.
     */
    columns: _react2.default.PropTypes.array.isRequired,

    /**
     * A callback to call when the user clicks a sorting button.
     */
    onSelect: _react2.default.PropTypes.func.isRequired,

    /**
     * A name of the soring column, or undefined.
     */
    sortingColumnName: _react2.default.PropTypes.string,

    /**
     * A way to sort, or undefined.
     */
    sortingOrder: _react2.default.PropTypes.oneOf(['asc', 'desc'])
  },

  render: function render() {
    if (this.props.columns.length === 0) {
      return _react2.default.createElement('div', null);
    }

    return _react2.default.createElement(
      'form',
      { className: 'form-inline' },
      _react2.default.createElement(
        'div',
        { className: 'form-group' },
        _react2.default.createElement(
          'label',
          null,
          'Sort by'
        ),
        ' ',
        _react2.default.createElement(
          'div',
          { className: 'btn-group btn-group-sm', role: 'group', 'aria-label': 'Sorting' },
          this.props.columns.map(this._renderColumn)
        )
      )
    );
  },
  _renderColumn: function _renderColumn(column) {
    var selected = this.props.sortingColumnName === column.name;
    var klass = (0, _classnames2.default)({
      'btn': true,
      'btn-primary': selected,
      'btn-secondary': !selected
    });
    var asc = this.props.sortingOrder === 'asc';
    var iconClass = (0, _classnames2.default)({
      'fa': true,
      'fa-sort': !selected,
      'fa-sort-asc': selected && asc,
      'fa-sort-desc': selected && !asc
    });
    return _react2.default.createElement(
      'button',
      { type: 'button', className: klass, onClick: this._onSelect.bind(this, column) },
      column.title,
      ' ',
      _react2.default.createElement('span', { className: iconClass })
    );
  },
  _onSelect: function _onSelect(column) {
    this.props.onSelect(column);
  }
});

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/components/sorter.js');
}();

;