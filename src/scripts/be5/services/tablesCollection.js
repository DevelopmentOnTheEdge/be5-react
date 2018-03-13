const tablesCollection = {
  types: {},

  getTable(tableName) {
    if(tableName !== undefined)
      return this.types[tableName];
    else
      return this.types['table']
  },

  registerTable(tableName, component) {
    this.types[tableName] = component;
  }
};

export default tablesCollection;
