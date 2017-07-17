'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _be = require('../be5');

var _be2 = _interopRequireDefault(_be);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PoolPage = _react2.default.createClass({
  displayName: 'Pool',

  getInitialState: function getInitialState() {
    return { loading: true, value: '' };
  },

  componentDidMount: function componentDidMount() {
    this._update();
  },
  render: function render() {
    var value = this.state.value;
    return _react2.default.createElement(
      'article',
      { id: 'pool' },
      _react2.default.createElement(
        'h1',
        null,
        'Connection pool statistics'
      ),
      _react2.default.createElement(
        'div',
        { className: 'operationList' },
        _react2.default.createElement(
          'button',
          { type: 'button', className: 'btn btn-secondary', onClick: this._update },
          'update'
        )
      ),
      _react2.default.createElement('p', { dangerouslySetInnerHTML: { __html: value } })
    );
  },
  _update: function _update() {
    var _this = this;

    _be2.default.net.request('pool', {}, function (data) {
      if (data.type !== 'error') {
        console.info(data);
        _this.setState({ loading: false, value: data.result });
      }
    });
  }
});

var _default = PoolPage;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(PoolPage, 'PoolPage', 'src/scripts/be5/components/pool.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/components/pool.js');
}();

;