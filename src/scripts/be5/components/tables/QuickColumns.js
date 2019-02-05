import React, {Component} from 'react';
import be5 from '../../be5';

class QuickColumns extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.createStateFromProps(this.props);
  };

  componentWillReceiveProps(nextProps) {
    this.setState(this.createStateFromProps(nextProps));
  }

  createStateFromProps(props) {
    if (props.columns.length === 0) return [];
    //const firstRow=props.rows[0].cells;
    return {
      quickColumns:
        props.columns
          .map((col, idx) => {
            if (col.quick)
              return {columnId: idx, visible: col.quick === 'yes'};
            else return null;
          })
          .filter((col) => {
            return col !== null
          })
    };
  }

  setTable(_table) {
    this.setState({table: _table});
  }

  quickHandleChange(idx) {
    const quickColumn = this.state.quickColumns[idx];
    quickColumn.visible = !quickColumn.visible;
    const value = quickColumn.visible === true ? "yes" : "no";
    be5.net.request("quick", {
      "table_name": this.props.category,
      "query_name": this.props.page,
      "column_name": this.props.columns[quickColumn.columnId].name,
      "quick": value
    });
    this.forceUpdate();
  }

  render() {
    if (this.state.quickColumns.length === 0) {
      return null;
    }
    if (this.state.table) {
      const dataTable = $(this.state.table).find('table').dataTable();
      const columnsCount = dataTable.fnSettings().aoColumns.length;
      this.state.quickColumns.forEach((col) => {
        const columnId = col.columnId + 1;
        if (columnId < columnsCount) {
          const dtColumn = dataTable.api().column(columnId);
          if (dtColumn.visible) dtColumn.visible(col.visible);
        }
      });
    }

    const checks = this.state.quickColumns.map(function (cell, idx) {
      const column = this.props.columns[cell.columnId];
      const title = column.title.replace(/<br\s*[\/]?>/gi, " ");
      return (
        <span key={idx}>
            <input id={"quick" + idx} type="checkbox" checked={cell.visible}
                   onChange={() => this.quickHandleChange(idx)}/>
            <label htmlFor={"quick" + idx} className="rowIndex">{title} </label>
        </span>
      );
    }.bind(this));

    return (
      <div id="quickColumns">
        <span>Другие колонки:</span>
        {checks}
      </div>
    )
  }
}

export default QuickColumns;
