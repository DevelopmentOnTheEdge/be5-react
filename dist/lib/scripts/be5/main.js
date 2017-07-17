'use strict';

var _initialize = require('./core/initialize');

var _initialize2 = _interopRequireDefault(_initialize);

var _application = require('./components/application');

var _application2 = _interopRequireDefault(_application);

require('../../sass/styles.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _initialize2.default)('app', _application2.default);
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;