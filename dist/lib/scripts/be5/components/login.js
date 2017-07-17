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

var _ext = require('../core/ext');

var _ext2 = _interopRequireDefault(_ext);

var _bus = require('../core/bus');

var _bus2 = _interopRequireDefault(_bus);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _bootstrapModal = require('./bootstrapModal');

var _bootstrapModal2 = _interopRequireDefault(_bootstrapModal);

require('../../../css/login.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Login = _react2.default.createClass({

  displayName: 'Login',

  propTypes: {
    onConfirm: _react2.default.PropTypes.func.isRequired,
    onCancel: _react2.default.PropTypes.func.isRequired,
    onSuccess: _react2.default.PropTypes.func.isRequired
  },

  getInitialState: function getInitialState() {
    return {
      errorMessage: '',
      infoMessage: ''
    };
  },
  render: function render() {
    var _this = this;

    var extensions = _ext2.default.get('login').map(function (e) {
      return e(_this._onSuccess).render();
    });
    //<a href="#!restore">Forgot password?</a>
    return _react2.default.createElement(
      'div',
      { className: 'login' },
      _react2.default.createElement(
        _bootstrapModal2.default,
        { title: _be2.default.messages.Login, ref: 'modal', confirm: _be2.default.messages.OK, cancel: _be2.default.messages.cancel, onCancel: this._cancel, onConfirm: this._confirm },
        _react2.default.createElement(
          'form',
          { className: 'login-form' },
          _react2.default.createElement(
            'div',
            { className: 'form-group row' },
            _react2.default.createElement(
              'label',
              { htmlFor: 'login-username' },
              _be2.default.messages.Name
            ),
            _react2.default.createElement('input', { type: 'text', id: 'login-username', className: 'form-control', ref: 'username', placeholder: '', onKeyDown: this._handleKeyDown })
          ),
          _react2.default.createElement(
            'div',
            { className: 'form-group row' },
            _react2.default.createElement(
              'label',
              { htmlFor: 'login-password' },
              _be2.default.messages.Password
            ),
            _react2.default.createElement('input', { type: 'password', id: 'login-password', className: 'form-control', ref: 'password', placeholder: '', onKeyDown: this._handleKeyDown })
          )
        ),
        extensions,
        this._getErrorMessage(),
        this._getInfoMessage()
      )
    );
  },
  componentDidMount: function componentDidMount() {
    var _this2 = this;

    _ext2.default.get('login').forEach(function (e) {
      return e(_this2._onSuccess).componentDidMount();
    });
  },
  show: function show() {
    this.refs.modal.open();
    setTimeout(function () {
      return (0, _jquery2.default)('#login-username').focus();
    }, 500);
  },
  _getErrorMessage: function _getErrorMessage() {
    if (this.state.errorMessage) {
      return _react2.default.createElement(
        'div',
        { className: 'alert alert-danger' },
        this.state.errorMessage
      );
    }
    return undefined;
  },
  _setErrorMessage: function _setErrorMessage(message) {
    this.setState({ errorMessage: message });
  },
  _getInfoMessage: function _getInfoMessage() {
    if (this.state.infoMessage) {
      return _react2.default.createElement(
        'div',
        { className: 'alert alert-info' },
        this.state.infoMessage
      );
    }
    return undefined;
  },
  _setInfoMessage: function _setInfoMessage(message) {
    this.setState({ infoMessage: message });
  },
  _cancel: function _cancel() {
    this._close();
    this.props.onCancel();
  },
  _handleKeyDown: function _handleKeyDown(event) {
    if (event.keyCode == 13) {
      // Enter
      this._confirm();
    } else if (event.keyCode == 27) {
      // ESC
      this._cancel();
    } else if (this.state.errorMessage) {
      this._setErrorMessage('');
    }
  },
  _confirm: function _confirm() {
    var username = _reactDom2.default.findDOMNode(this.refs.username).value;
    var password = _reactDom2.default.findDOMNode(this.refs.password).value;
    if (!username || !password) {
      this._setErrorMessage('Enter your username and password');
    } else {
      this.props.onConfirm(username, password, this._onSuccess, this._setErrorMessage);
    }
  },
  _onSuccess: function _onSuccess() {
    this.props.onSuccess();
    this._close();
  },
  _close: function _close() {
    this.refs.modal.close();
  }
});

_be2.default.net.errorHandlers['ACCESS_DENIED_TO_QUERY'] = function () {
  _be2.default.net.request('login/state', {}, function (_ref) {
    var loggedIn = _ref.value.loggedIn;

    if (!loggedIn) {
      //be5.url.set('');
      //be5.url.set('login/dialog/' + encodeURIComponent(document.location.hash));
    }
  });
};

var _default = Login;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Login, 'Login', 'src/scripts/be5/components/login.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/components/login.js');
}();

;