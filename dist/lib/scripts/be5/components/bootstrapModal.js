'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _bootstrapButton = require('./bootstrapButton');

var _bootstrapButton2 = _interopRequireDefault(_bootstrapButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.jQuery = window.$ = require('jquery');
window.Tether = require('tether');
require('bootstrap');

var _default = _react2.default.createClass({
  displayName: 'BootstrapModal',

  // The following two methods are the only places we need to
  // integrate with Bootstrap or jQuery!
  componentDidMount: function componentDidMount() {
    // When the component is added, turn it into a modal
    (0, _jquery2.default)(_reactDom2.default.findDOMNode(this)).modal({ backdrop: 'static', keyboard: false, show: false });
  },
  componentWillUnmount: function componentWillUnmount() {
    (0, _jquery2.default)(_reactDom2.default.findDOMNode(this)).off('hidden', this.handleHidden);
  },
  close: function close() {
    (0, _jquery2.default)(_reactDom2.default.findDOMNode(this)).modal('hide');
  },
  open: function open() {
    (0, _jquery2.default)(_reactDom2.default.findDOMNode(this)).modal('show');
  },
  render: function render() {
    var confirmButton = null;
    var cancelButton = null;
    var restoreButton = null;

    if (this.props.confirm) {
      confirmButton = _react2.default.createElement(
        _bootstrapButton2.default,
        { className: 'btn-primary', onClick: this._handleConfirm },
        this.props.confirm
      );
    }

    if (this.props.cancel) {
      cancelButton = _react2.default.createElement(
        _bootstrapButton2.default,
        { className: 'btn-default', onClick: this._cancel },
        this.props.cancel
      );
    }

    // Attempt to introduce a button to restore password
    if (this.props.restore) {
      restoreButton = _react2.default.createElement(
        _bootstrapButton2.default,
        { className: 'btn-warning', onClick: this._restore },
        this.props.restore
      );
    }

    return _react2.default.createElement(
      'div',
      { className: 'modal hide fade' },
      _react2.default.createElement(
        'div',
        { className: 'modal-dialog', role: 'document' },
        _react2.default.createElement(
          'div',
          { className: 'modal-content' },
          _react2.default.createElement(
            'div',
            { className: 'modal-header' },
            _react2.default.createElement(
              'button',
              { type: 'button', className: 'close', onClick: this._cancel },
              '\xD7'
            ),
            _react2.default.createElement(
              'h4',
              null,
              this.props.title
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal-body' },
            this.props.children
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal-footer' },
            restoreButton,
            '\xA0',
            cancelButton,
            '\xA0',
            confirmButton
          )
        )
      )
    );
  },
  _cancel: function _cancel() {
    this.props.onCancel && this.props.onCancel();
  },
  _handleConfirm: function _handleConfirm() {
    this.props.onConfirm && this.props.onConfirm();
  },
  _restore: function _restore() {
    this.props.onRestore && this.props.onRestore();
  }
});

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/components/bootstrapModal.js');
}();

;