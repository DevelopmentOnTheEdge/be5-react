'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _be = require('../be5');

var _be2 = _interopRequireDefault(_be);

var _simpleTable = require('./simpleTable');

var _simpleTable2 = _interopRequireDefault(_simpleTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _react2.default.createClass({
  propTypes: {
    title: _react2.default.PropTypes.string.isRequired
  },

  displayName: 'Be5Block',

  getInitialState: function getInitialState() {
    return {};
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'card card-block' },
      _react2.default.createElement(
        'h3',
        { className: 'card-title' },
        this.props.title
      ),
      this._getContent()
    );
  },
  _getContent: function _getContent() {
    return _react2.default.createElement(_simpleTable2.default, { entity: this.props.entity, query: this.props.query, responsive: this.props.responsive, showHead: this.props.showHead });
  }
});

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/components/be5Block.js');
}();

;