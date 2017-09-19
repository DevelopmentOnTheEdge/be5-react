import TableForm    from '../components/tables/tableForm';
import TableFormRow from '../components/tables/tableFormRow';
import FormTable    from '../components/tables/formTable';
import Table        from '../components/tables/table';


const tablesCollections = {
  types: {
    tableForm: TableForm,
    tableFormRow: TableFormRow,
    formTable: FormTable,
    table: Table,
  },

  getTable(actionName) {
    return this.types[actionName];
  },

  registerTable(actionName, fn) {
    //console.log("registerTable: " + actionName, fn)
    this.types[actionName] = fn;
  }
};

export default tablesCollections;
