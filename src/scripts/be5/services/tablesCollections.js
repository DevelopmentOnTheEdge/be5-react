const tablesCollections = {
  types: {},

  getTable(actionName) {
    return this.types[actionName];
  },

  registerTable(actionName, fn) {
    //console.log("registerTable: " + actionName, fn)
    this.types[actionName] = fn;
  }
};

export default tablesCollections;
