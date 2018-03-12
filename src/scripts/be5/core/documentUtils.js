// const createIllegalArgumentError = () => ({
//   name: 'IllegalArgumentError',
//   message: ''
// });
//
// const getColumnName = function(column) {
//   return typeof column === 'string' ? column : column.name;
// };
//
// const toRows = function(table) {
//   if (table.type && table.type === 'table') {
//     table = table.value;
//   }
//
//   return table.rows.map(row => {
//     const resultRow = { id: row.id };
//     for (var i = 0; i < row.cells.length; i++) {
//       resultRow[getColumnName(table.columns[i])] = row.cells[i];
//     }
//     return resultRow;
//   });
// };
//
// const getSortableColumns = function(table) {
//   if (table.type && table.type === 'table') {
//     table = table.value;
//   }
//
//   return table.columns.filter(column => !(column.options && column.options.nosort));
// };
//
// const toRow = function(table) {
//   const rows = toRows(table);
//   if (rows.length !== 1) {
//     throw createIllegalArgumentError();
//   }
//   return rows[0];
// };
//
// const createDocument = function(resource) {
//   return _.extend({
//     toRow: function() {
//       return toRow(this);
//     },
//     toRows: function() {
//       return toRows(this);
//     },
//   }, resource);
// };

export default {
  // toRows: toRows,
  // toRow: toRow,
  // createDocument: createDocument,
  // getSortableColumns: getSortableColumns
  getResourceByID : function (included, id) {
    for(let i =0; i < included.length; i++)
    {
      if(included[i].id === id)return included[i];
    }
    return undefined;
  }
};
