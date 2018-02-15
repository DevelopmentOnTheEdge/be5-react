const formsCollections = {
  types: {},

  getForm(actionName) {
    return this.types[actionName];
  },

  registerForm(actionName, fn) {
    this.types[actionName] = fn;
  }
};

export default formsCollections;
