const formsCollection = {
  types: {},

  getForm(formName) {
    return this.types[formName];
  },

  registerForm(formName, component) {
    this.types[formName] = component;
  }
};

export default formsCollection;
