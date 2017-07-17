'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _be5MenuHolder = require('./be5MenuHolder');

var _be5MenuHolder2 = _interopRequireDefault(_be5MenuHolder);

var _action = require('./action');

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _react2.default.createClass({
  displayName: 'Be5Menu',

  propTypes: {
    // true => default menu
    // false => user lists all possible items using Be5MenuItem
    show: _react2.default.PropTypes.bool.isRequired,
    branding: _react2.default.PropTypes.string
  },

  getInitialState: function getInitialState() {
    return { loaded: false };
  },
  componentDidMount: function componentDidMount() {
    if (this.props.show) {
      this._onMenuChanged(_be5MenuHolder2.default.getMenu());
      _be5MenuHolder2.default.addListener(this._onMenuChanged);
    }
  },
  _onMenuChanged: function _onMenuChanged(menu) {
    this.setState({
      loaded: Object.keys(menu.getRaw()).length !== 0,
      menu: menu.getRaw()
    });
  },
  render: function render() {
    if (!this.props.show) {
      return _react2.default.createElement('span', null);
    }

    var rootMenuItems = this.state.loaded ? this._renderMenuItems(this.state.menu.root, false) : _react2.default.createElement(
      'li',
      null,
      'Loading...'
    );
    var branding = this.props.branding ? _react2.default.createElement(
      'a',
      { className: 'navbar-brand', href: '#' },
      this.props.branding
    ) : undefined;
    var rightButtons = this._renderRightButtons();

    return _react2.default.createElement(
      'nav',
      { className: 'navbar navbar-light bg-faded' },
      _react2.default.createElement(
        'div',
        { className: 'container' },
        branding,
        _react2.default.createElement(
          'ul',
          { className: 'nav navbar-nav' },
          rootMenuItems
        ),
        rightButtons
      )
    );
  },
  _renderRightButtons: function _renderRightButtons() {
    if (!this.state.loaded) {
      return undefined;
    }
    if (!this.state.menu.loggedIn) {
      return _react2.default.createElement(
        'form',
        { className: 'form-inline pull-right' },
        _react2.default.createElement(
          'a',
          { className: 'btn btn-secondary', role: 'button', href: '#!login' },
          'Sign in'
        ),
        ' ',
        _react2.default.createElement(
          'a',
          { className: 'btn btn-primary', role: 'button', href: '#!register' },
          'Sign up'
        )
      );
    }
    return _react2.default.createElement(
      'form',
      { className: 'form-inline pull-right' },
      _react2.default.createElement(
        'a',
        { className: 'btn btn-secondary', role: 'button', href: '#!logout' },
        'Log out'
      )
    );
  },
  _renderMenuItems: function _renderMenuItems(items, inDropdown) {
    var _this = this;

    return _(items).map(function (item) {
      if (item.default) {
        return undefined;
      }

      if (!item.children || item.children.length === 0) {
        var _Action$parse = _action2.default.parse(item.action),
            href = _Action$parse.href,
            target = _Action$parse.target;

        var liClass = inDropdown ? '' : 'nav-item';
        var aClass = inDropdown ? 'dropdown-item' : 'nav-link';
        return _react2.default.createElement(
          'li',
          { className: liClass, key: target + href },
          _react2.default.createElement(
            'a',
            { className: aClass, href: href, target: target },
            item.title
          )
        );
      }

      var dropdownMenuItems = _this._renderMenuItems(item.children, true);

      return _react2.default.createElement(
        'li',
        { className: 'nav-item dropdown', key: item.title },
        _react2.default.createElement(
          'a',
          { className: 'nav-link dropdown-toggle', href: '#', 'data-toggle': 'dropdown', 'aria-haspopup': 'true', 'aria-expanded': 'false', role: 'button' },
          item.title
        ),
        _react2.default.createElement(
          'ul',
          { className: 'dropdown-menu' },
          dropdownMenuItems
        )
      );
    });
  },


  /* public */
  refresh: function refresh() {
    _be5MenuHolder2.default.reload();
  }
});

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/components/be5Menu.js');
}();

;