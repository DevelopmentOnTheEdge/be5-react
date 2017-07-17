'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _be = require('../be5');

var _be2 = _interopRequireDefault(_be);

var _forms = require('../services/forms');

var _forms2 = _interopRequireDefault(_forms);

var _form = require('./form');

var _form2 = _interopRequireDefault(_form);

var _tables = require('../services/tables');

var _tables2 = _interopRequireDefault(_tables);

var _table = require('./table');

var _table2 = _interopRequireDefault(_table);

var _staticPage = require('./staticPage');

var _staticPage2 = _interopRequireDefault(_staticPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This is a super component that can do everything. 
 */
var services = {
  'table': _tables2.default,
  'form': _forms2.default
};
var components = {
  'table': _table2.default,
  'form': _form2.default,
  'static': _staticPage2.default
};

var _default = _react2.default.createClass({
  displayName: 'Be5View',

  propTypes: {
    type: _react2.default.PropTypes.string.isRequired,
    params: _react2.default.PropTypes.any.isRequired
  },

  getInitialState: function getInitialState() {
    return { type: 'loading', value: _be2.default.messages.loading };
  },
  componentDidMount: function componentDidMount() {
    this._requestData(this.props.type, this.props.params);
  },
  render: function render() {
    if (this.state.type === 'loading') {
      return _react2.default.DOM.div({}, _react2.default.DOM.h1({ className: 'text-center' }, this.state.value));
    }

    return _react2.default.createElement(this._getComponent(this.state.type), this.state);
  },
  _requestData: function _requestData(type, params) {
    this._getService(type).load(params, this._onLoad);
  },
  _onLoad: function _onLoad(data) {
    this.setState(data);
  },
  _getService: function _getService(type) {
    if (services[type]) {
      return services[type];
    }
    throw this._createUnkonwnComponentType(type);
  },
  _getComponent: function _getComponent(type) {
    if (components[type]) {
      return components[type];
    }
    throw this._createUnkonwnComponentType(type);
  },
  _createUnkonwnComponentType: function _createUnkonwnComponentType(type) {
    return {
      name: 'UnknownComponentType',
      message: 'Unknown component "' + type + '"'
    };
  }
});

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(services, 'services', 'src/scripts/be5/components/be5View.js');

  __REACT_HOT_LOADER__.register(components, 'components', 'src/scripts/be5/components/be5View.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/components/be5View.js');
}();

;