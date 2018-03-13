const formsCollection = {
  types: {},

  getForm(formName) {
    if(formName !== undefined)
      return this.types[formName];
    else
      return this.types['form'];
  },

  registerForm(formName, component) {
    this.types[formName] = component;
  }
};

export default formsCollection;
