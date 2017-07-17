'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _be = require('../be5');

var _be2 = _interopRequireDefault(_be);

var _bus = require('../core/bus');

var _bus2 = _interopRequireDefault(_bus);

var _login = require('../components/login');

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'dialog';
  var param1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var param2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

  var redirectUrl = undefined;

  if (type === 'dialog' && param1) {
    redirectUrl = decodeURIComponent(param1);
  }

  var confirm = function confirm(username, password, onSuccess, loginError) {
    _be2.default.net.request('login', { username: username, password: password }, function (data) {
      if (data.type === 'ok') {
        onSuccess();
      } else {
        loginError('Not okay');
      }
    }, function (data) {
      loginError('Incorrect name or password');
    });
  };

  var goBack = function goBack() {
    if (redirectUrl) {
      _be2.default.url.set(redirectUrl);
    } else {
      _be2.default.url.clear();
    }
  };

  var redirectAndRefresh = function redirectAndRefresh() {
    if (redirectUrl) {
      _be2.default.url.set(redirectUrl);
    } else {
      _bus2.default.fire('CallDefaultAction');
    }

    _bus2.default.fire('LoggedIn');
  };

  switch (type) {
    case 'auto':
      var username = param1 || '';
      var password = param2 || '';
      confirm(username, password);
      return;
    default:
      var parameters = { onConfirm: confirm, onCancel: goBack, onSuccess: redirectAndRefresh };
      var loginComponent = _reactDom2.default.render(_react2.default.createElement(_login2.default, parameters), document.getElementById('login'));
      loginComponent.show();
      return;
  }
};

exports.default = _default;
;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/actions/login.js');
}();

;