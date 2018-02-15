const createUnknownActionException = actionName => ({
  name: 'UnknownActionException',
  message: 'Action \'' + actionName + '\' is unknown'
});

export default {
  /**
   * Returns an object with href and target.
   */
  parse: function(action) {
    switch (action.name) {
    case 'open':
      return {
        href: action.arg,
        target: '_blank'
      };
    case 'call':
      return {
        href: '#!' + action.arg,
        target: ''
      };
    }
    
    throw createUnknownActionException(action.name);
  }
};
