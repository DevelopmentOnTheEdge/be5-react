import React, {Component} from 'react';
import $                  from 'jquery';


class QuickColumns extends Component
{
  constructor(props) {
    super(props);

    this.state = this.createStateFromProps(this.props);
  };

  componentWillReceiveProps(nextProps){
    this.setState(this.createStateFromProps(nextProps));
  }

  createStateFromProps(props){
    return {quickColumns:
      props.firstRow
        .map( (col, idx) => {
          if(col.options.quick)
            return {columnId: idx, visible: col.options.quick.visible === 'true'};
          else return null;
        })
        .filter((col) => {return col !== null})
    };
  }

  setTable(_table){
    this.setState({table: _table});
  }

  quickHandleChange(idx) {
    this.state.quickColumns[idx].visible = !this.state.quickColumns[idx].visible;
    this.forceUpdate();
  }

  render() {
    if(this.state.quickColumns.length === 0){
      return (<div/>)
    }
    if(this.state.table){
      const dataTable = $(this.state.table).find('table').dataTable();
      const columnsCount = dataTable.fnSettings().aoColumns.length ;
      this.state.quickColumns.forEach((col) => {
        const columnId = col.columnId + (this.props.selectable ? 1 : 0);
        if(columnId < columnsCount){
          const dtColumn = dataTable.api().column( columnId );
          if(dtColumn.visible)dtColumn.visible( col.visible );
        }
      });
    }

    const checks = this.state.quickColumns.map(function(cell, idx) {
      const column = this.props.columns[cell.columnId];
      const title = column.replace(/<br\s*[\/]?>/gi, " ");
      return (
        <span key={idx}>
            <input id={"quick" + idx} type="checkbox" checked={cell.visible} onChange={() => this.quickHandleChange(idx)} />
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