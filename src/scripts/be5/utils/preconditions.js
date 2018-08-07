const createMandatoryArgumentError = message => ({
  name: 'MandatoryArgumentError',
  message: message
});

const createArgumentEqualityError = message => ({
  name: 'ArgumentEqualityError',
  message: message
});

export default {
  passed: function(argument, message) {
    if (!argument) {
      console.trace();
      throw createMandatoryArgumentError(message || 'argument is missing');
    }
    return argument;
  },
  eq: function(arg1, arg2, message) {
    if (arg1 !== arg2) {
      console.trace();
      throw createArgumentEqualityError(message || `${arg1} should be equal to ${arg2}`);
    }
  }
};
