'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _be5MenuHolder = require('./be5MenuHolder');

var _be5MenuHolder2 = _interopRequireDefault(_be5MenuHolder);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _action = require('./action');

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _react2.default.createClass({
  displayName: 'Be5MenuItem',

  propTypes: {
    entity: _react2.default.PropTypes.string,
    view: _react2.default.PropTypes.string,
    op: _react2.default.PropTypes.string
  },

  getInitialState: function getInitialState() {
    return { available: false, title: '' };
  },
  componentDidMount: function componentDidMount() {
    this._onMenuChanged(_be5MenuHolder2.default.getMenu());
    _be5MenuHolder2.default.addListener(this._onMenuChanged);
  },
  render: function render() {
    if (!this.state.available) {
      return _react2.default.createElement('span', null);
    }

    var _Action$parse = _action2.default.parse(_be5MenuHolder2.default.getMenu().find(this._getCoordinates()).action),
        href = _Action$parse.href,
        target = _Action$parse.target;

    return _react2.default.createElement(
      'a',
      { className: 'menu-item', href: href, target: target },
      this.state.title
    );
  },
  _onMenuChanged: function _onMenuChanged(menu) {
    var item = _be5MenuHolder2.default.getMenu().find(this._getCoordinates());
    if (!item) {
      this.setState({ available: false });
    } else {
      this.setState({ available: true, title: item.title });
    }
  },


  // Translates "op" to "operation" and "view" to "query"
  // Don't read it, it's boring.
  _getCoordinates: function _getCoordinates() {
    if (this.props.view && this.props.op) {
      return {
        entity: this.props.entity, query: this.props.view, operation: this.props.op
      };
    }
    if (this.props.op) {
      return {
        entity: this.props.entity, operation: this.props.op
      };
    }
    return {
      entity: this.props.entity,
      query: this.props.view || _constants2.default.DEFAULT_VIEW
    };
  }
});

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/components/be5MenuItem.js');
}();

;