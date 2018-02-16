const actionsCollection = {
  types: {},

  getAction(actionName) {
    return this.types[actionName];
  },

  registerAction(actionName, fn) {
    //console.log("registerTable: " + actionName, fn)
    this.types[actionName] = fn;
  }
};

export default actionsCollection;
