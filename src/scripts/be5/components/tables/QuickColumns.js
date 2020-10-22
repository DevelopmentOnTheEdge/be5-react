import React from 'react';
import be5 from '../../be5';
import bus from "../../core/bus";
import Select, {Option} from 'react-select';


class CheckBoxOption extends React.Component {
  constructor(props) {
    super(props);
    this.checkBoxOnChange = this.checkBoxOnChange.bind(this)
  };


  checkBoxOnChange(){
    this.props.option.quickHandleChange(this.props.option.idx)
  }

  render() {
    const {label, columnId, checked} = this.props.option
    return (

        <div className="Select-value" title={label}>
              <span className="Select-value-label">
                  <input type="checkBox" id={"quick" + columnId} checked={checked}
                         onChange={ () => this.checkBoxOnChange()}/>
                  <label htmlFor={"quick" + columnId}>{label}</label>
              </span>
        </div>
    )
  }
}



class QuickColumns extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.createStateFromProps(this.props);
    this.updateDataTableQuickColumns = this.updateDataTableQuickColumns.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.quickHandleChange = this.quickHandleChange.bind(this);
  };

  componentDidMount() {
    bus.listen("updateDataTableQuickColumns", this.updateDataTableQuickColumns);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.meta._ts_ > this.props.meta._ts_) {
      this.setState(this.createStateFromProps(nextProps));
    }
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

  quickHandleChange(idx) {
    const quickColumn = this.state.quickColumns[idx];
    quickColumn.visible = !quickColumn.visible;
    const value = quickColumn.visible ? "yes" : "no";
    be5.net.request("quick", {
      "table_name": this.props.category,
      "query_name": this.props.page,
      "column_name": this.props.columns[quickColumn.columnId].name,
      "quick": value
    });
    this.forceUpdate();
  }

  handleChangeSelect(options) {
    const selectedValues = options.map(option => option.value);
    const visibleColumns = this.state.quickColumns.filter(c => c.visible).map(c => c.columnId);
    let indexes = [];
    let visible = selectedValues.length > visibleColumns.length;

    if (selectedValues.length > visibleColumns.length)
      indexes = selectedValues.filter(idx => !visibleColumns.includes(idx));
    else if (selectedValues.length < visibleColumns.length)
      indexes = visibleColumns.filter(idx => !selectedValues.includes(idx));


    indexes.forEach(idx => {
      const arrayIdx = this.state.quickColumns.findIndex(item => item.columnId === idx);
      if (arrayIdx > -1) {
        this.state.quickColumns[arrayIdx].visible = visible;
        be5.net.request("quick", {
          "table_name": this.props.category,
          "query_name": this.props.page,
          "column_name": this.props.columns[idx].name,
          "quick": visible ? "yes" : "no"
        });
        this.forceUpdate();
      }
    });
  };

  render() {
    if (this.state.quickColumns.length === 0) {
      return null;
    }
    this.updateDataTableQuickColumns();

    const checks = this.state.quickColumns.map(function (cell, idx) {
      const column = this.props.columns[cell.columnId];
      const title = column.title.replace(/<br\s*[\/]?>/gi, " ");
      return (
          <span key={idx}>
            <input className="checkbox-input" id={"quick" + idx} type="checkbox" checked={cell.visible}
                   onChange={() => this.quickHandleChange(idx)}/>
            <label htmlFor={"quick" + idx} className="rowIndex">{title} </label>
        </span>
      );
    }.bind(this));


    const select = (() => {
      const id = "quick-select-" + this.props.page;
      const options = [];
      const value = [];
      const localization = be5.messages.property || {};//empty object for tests

      this.state.quickColumns.forEach((cell, idx) => {
        const column = this.props.columns[cell.columnId];
        const title = column.title.replace(/<br\s*[\/]?>/gi, " ");
        options.push({
          idx: idx,
          columnId: cell.columnId,
          label: title,
          checked: cell.visible,
          quickHandleChange: this.quickHandleChange
        });
        if (cell.visible) {
          value.push(cell.columnId)
        }
      })
      const selectAttr = {
        id: id,
        ref: id,
        name: id,
        value: value,
        options: options,
        onChange: this.handleChangeSelect,
        clearAllText: localization.clearAllText,
        clearValueText: localization.clearValueText,
        noResultsText: localization.noResultsText,
        searchPromptText: localization.searchPromptText,
        loadingPlaceholder: localization.loadingPlaceholder,
        placeholder: localization.placeholder,
        backspaceRemoves: false,
        disabled: false,
        multi: true,
        matchPos: "any",
        inputProps: {autoComplete: 'off'},
        width: '200px',
        optionComponent:CheckBoxOption
      };

      return (<Select {...selectAttr}/>);
    });
    const getQuickColumns = () => {
      if (this.props.layout && this.props.layout.quickType === "select") {
        return <div id="quickColumns" className="d-flex flex-row flex-wrap align-items-center" >
          <div>{be5.messages.otherColumns}:</div><div className="select-container ml-sm-2" >{select()}</div>
        </div>

      } else {
        return <div id="quickColumns">
          <span id="checkbox-container">{be5.messages.otherColumns}:</span>
          {checks}
        </div>
      }
    }
    return (getQuickColumns())
  }

  updateDataTableQuickColumns() {
    const table = $('#dataTables' + this.props.meta._ts_);
    if (table.length > 0) {
      const dataTable = table.dataTable();
      const columnsCount = dataTable.fnSettings().aoColumns.length;
      this.state.quickColumns.forEach((col) => {
        const columnId = col.columnId + 1;
        if (columnId < columnsCount) {
          const dtColumn = dataTable.api().column(columnId);
          if (dtColumn.visible) dtColumn.visible(col.visible);
        }
      });
    }
  }
}

export default QuickColumns;
