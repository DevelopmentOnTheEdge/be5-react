'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _be = require('../be5');

var _be2 = _interopRequireDefault(_be);

require('../../../css/languageSelector.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Language = _react2.default.createClass({ displayName: "Language",
  onClick: function onClick(e) {
    this.props.onLanguageClick(this.props.code);
  },
  render: function render() {
    if (this.props.selected) {
      return _react2.default.DOM.div({ className: "language selectedLanguage" }, this.props.code);
    }
    return _react2.default.DOM.div({ className: "language", onClick: this.onClick }, this.props.code);
  }
});

var LanguageList = _react2.default.createClass({ displayName: "LanguageList",
  render: function render() {
    var selected = this.props.data.selected;
    var onLanguageClick = this.props.onLanguageClick;
    var languageNodes = this.props.data.languages.map(function (language) {
      return _react2.default.createElement(Language, { key: language, code: language, selected: language == selected, onLanguageClick: onLanguageClick });
    });
    return _react2.default.DOM.div({ className: "languageList" }, languageNodes);
  }
});

var _default = _react2.default.createClass({
  displayName: 'LanguageBox',

  getInitialState: function getInitialState() {
    return { data: { languages: [], selected: '' } };
  },
  componentDidMount: function componentDidMount() {
    this.refresh();
  },
  refresh: function refresh() {
    _be2.default.net.request('languageSelector', {}, function (data) {
      _be2.default.locale.set(data.selected, data.messages);
      this.setState({ data: { selected: data.selected, languages: data.languages } });
    }.bind(this));
  },
  changeLanguage: function changeLanguage(language) {
    _be2.default.net.request('languageSelector/select', { language: language }, function (data) {
      this.setState({ data: { selected: data.selected, languages: data.languages } });
      _be2.default.locale.set(language, data.messages);
    }.bind(this));
  },
  render: function render() {
    return _react2.default.DOM.div({ className: "languageBox" }, _react2.default.createElement(LanguageList, { data: this.state.data, onLanguageClick: this.changeLanguage }));
  }
});

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Language, 'Language', 'src/scripts/be5/components/languageSelector.js');

  __REACT_HOT_LOADER__.register(LanguageList, 'LanguageList', 'src/scripts/be5/components/languageSelector.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/components/languageSelector.js');
}();

;