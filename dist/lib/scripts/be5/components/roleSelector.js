'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _be = require('../be5');

var _be2 = _interopRequireDefault(_be);

var _bus = require('../core/bus');

var _bus2 = _interopRequireDefault(_bus);

require('../../../css/roleSelector.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Role = _react2.default.createClass({
  displayName: 'Role',

  propTypes: {
    onChange: _react2.default.PropTypes.func.isRequired
  },

  getInitialState: function getInitialState() {
    return { selectedRoles: this.props.selectedRoles };
  },
  render: function render() {
    var id = this.props.name + "-checkbox";
    return _react2.default.DOM.div({ className: "role" }, _react2.default.DOM.input({ type: "checkbox", checked: this.state.selectedRoles, id: id, onChange: this._onChange }), _react2.default.DOM.label({ htmlFor: id }, _react2.default.DOM.span({ className: "checkBox" }), this.props.name));
  },
  _onChange: function _onChange(e) {
    this.setState({ selectedRoles: e.target.checked }, this.props.onChange);
  }
});

var _default = _react2.default.createClass({
  displayName: 'RoleBox',

  getInitialState: function getInitialState() {
    return { availableRoles: ["Unknown"], selectedRoles: ["Unknown"] };
  },
  render: function render() {
    if (this.state.availableRoles.length <= 1) {
      return _react2.default.DOM.div({ className: "roleBox" });
    }
    var selectedRoles = this.state.selectedRoles;
    var roleNodes = this.state.availableRoles.map(function (role) {
      return _react2.default.createElement(Role, { key: role, ref: role, name: role, selectedRoles: $.inArray(role, selectedRoles) != -1, onChange: this._onRoleChange });
    }.bind(this));
    return _react2.default.DOM.div({ className: "roleBox" }, _react2.default.DOM.h4({}, _be2.default.messages.roles), roleNodes);
  },
  componentDidMount: function componentDidMount() {
    this.refresh();
  },
  refresh: function refresh() {
    var _this = this;

    _be2.default.net.request('roleSelector', {}, function (data) {
      return _this.setState(data);
    });
  },
  _onRoleChange: function _onRoleChange() {
    var _this2 = this;

    var roles = this.state.availableRoles.filter(function (name) {
      return _this2.refs[name].state.selectedRoles;
    });
    this._changeRoles(roles.join(","));
  },
  _changeRoles: function _changeRoles(roles) {
    var _this3 = this;

    _be2.default.net.request('roleSelector/select', { roles: roles }, function (data) {
      _this3.setState(data);
      _bus2.default.fire('RoleChanged', {});
    });
  }
});

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Role, 'Role', 'src/scripts/be5/components/roleSelector.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/components/roleSelector.js');
}();

;