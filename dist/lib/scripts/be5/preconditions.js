'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createMandatoryArgumentError = function createMandatoryArgumentError(message) {
  return {
    name: 'MandatoryArgumentError',
    message: message
  };
};

var createArgumentEqualityError = function createArgumentEqualityError(message) {
  return {
    name: 'ArgumentEqualityError',
    message: message
  };
};

var _default = {
  passed: function passed(argument, message) {
    if (!argument) {
      throw createMandatoryArgumentError(message || 'argument is missing');
    }
    return argument;
  },
  eq: function eq(arg1, arg2, message) {
    if (arg1 !== arg2) {
      throw createArgumentEqualityError(message || arg1 + ' should be equal to ' + arg2);
    }
  }
};
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(createMandatoryArgumentError, 'createMandatoryArgumentError', 'src/scripts/be5/preconditions.js');

  __REACT_HOT_LOADER__.register(createArgumentEqualityError, 'createArgumentEqualityError', 'src/scripts/be5/preconditions.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/preconditions.js');
}();

;