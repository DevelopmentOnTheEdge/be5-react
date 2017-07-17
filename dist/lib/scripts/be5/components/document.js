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

require('../../../css/document.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _react2.default.createClass({
  displayName: 'Document',

  getInitialState: function getInitialState() {
    return { component: 'text', value: "Page is loading..." };
  },
  render: function render() {
    // if (!this.state.hasOwnProperty('type')) {
    //   return React.DOM.div({className: "content"});
    // }
    //
    if (this.state.component == undefined) {
      return _react2.default.createElement(
        'div',
        { className: 'document-content' },
        _react2.default.createElement(
          'h1',
          null,
          this.state
        )
      );
    }

    if (this.state.component === 'text') {
      return _react2.default.createElement(
        'div',
        { className: 'document-content' },
        _react2.default.createElement(
          'h1',
          null,
          this.state.value
        )
      );
    }
    //
    // if (this.state.type === 'error') {
    //   return React.DOM.div({},
    //       React.DOM.h1({}, be5.messages.error + " " + this.state.value.code),
    //       this.state.value.message);
    // }
    _be2.default.ui.setTitle(this.state.value.title);

    var DocumentContent = this.state.component;
    if (DocumentContent !== null) {
      return _react2.default.createElement(
        'div',
        { className: 'document-content' },
        _react2.default.createElement(DocumentContent, { value: this.state.value })
      );
    }
    return null;
    //if (this.state.type in be5.ui.documentTypes) {
    //  return React.DOM.div({className: "content"}, be5.ui.createDocument(this.state.type, this.state.value));
    // } else {
    //   return (
    //     React.DOM.div({className: "content"}, "Unknown content type \"" + this.state.type + "\".", JSON.stringify(this.state.value))
    //   );
    // }
  },


  // this should occur only once
  componentDidMount: function componentDidMount() {
    var _this = this;

    _bus2.default.listen('DocumentChange', function (data) {
      return _this.replaceState(data);
    });
  }
});

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/components/document.js');
}();

;