const tablesCollection = {
  types: {},

  getTable(tableName) {
    return this.types[tableName];
  },

  registerTable(tableName, component) {
    this.types[tableName] = component;
  }
};

export default tablesCollection;
