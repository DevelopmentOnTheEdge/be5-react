import React from 'react';
import be5 from '../../be5';
import bus from "../../core/bus";
import Select, {components} from 'react-select';
import {getColumnSettings, isGuest, setColumnSettings} from "../../utils/utils";

const Option = props => {
  const {value, options} = props;
  const checkedOptions = options.filter(option => option.checked).map(option => option.columnId);
  const checked = value === "*" ? checkedOptions.length === options.length : checkedOptions.includes(value);
  return (
    <>
      <components.Option {...props}>
        <input type="checkbox" checked={checked} onChange={() => {}}/>{" "}
        <label>{props.label}</label>
      </components.Option>
    </>
)}

/*const MultiValue = props => (<components.MultiValue {...props}/>)*/

class QuickColumns extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.createStateFromProps(this.props);
    this.updateDataTableQuickColumns = this.updateDataTableQuickColumns.bind(this);
    this.quickHandleChange = this.quickHandleChange.bind(this);
  };

  componentDidMount() {
    bus.listen("updateDataTableQuickColumns", this.updateDataTableQuickColumns);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.meta._ts_ > this.props.meta._ts_) {
      this.setState(this.createStateFromProps(nextProps));
    }
  }

  createStateFromProps(props) {
    const table_name = props.category;
    const query_name = props.page;
    if (props.columns.length === 0) return [];
    //const firstRow=props.rows[0].cells;
    return {
      quickColumns:
          props.columns
              .map((col, idx) => {
                if (col.quick) {
                  const quickInfo = {columnId: idx, visible: col.quick === 'yes'};
                  if (isGuest) {
                    const visible = getColumnSettings(table_name, query_name, col.name, "visible");
                    if (visible)
                      quickInfo.visible = visible === 'yes';
                  }
                  return quickInfo;
                } else return null;
              }).filter((col) => col !== null)
    };
  }

  quickHandleChange(idx, visible) {
    const quickColumn = this.state.quickColumns[idx];
    quickColumn.visible = visible !== undefined ? visible : !quickColumn.visible;
    const value = quickColumn.visible ? "yes" : "no";
    const table_name = this.props.category;
    const query_name = this.props.page;
    const column_name = this.props.columns[quickColumn.columnId].name;

    if (isGuest) {
      setColumnSettings(table_name, query_name, column_name, "visible", value)
    } else {
      be5.net.request("quick", {
        "table_name": this.props.category,
        "query_name": this.props.page,
        "column_name": this.props.columns[quickColumn.columnId].name,
        "quick": value
      });
    }

    this.forceUpdate();
  }

  render() {
    if (this.state.quickColumns.length === 0) {
      return null;
    }
    this.updateDataTableQuickColumns();

    const handleSelect = (selected, event) => {
      const {action, option, removedValue} = event;
      let indexes = [];
      let visible;
      const allIndexes = this.state.quickColumns.map((el, i) => i);
      if (action === "select-option" && option && option.value !== "*") {
        indexes.push(option.idx);
      }else if (action === "select-option" && option && option.value === "*") {
        indexes = allIndexes;
        visible = !option.checked;
      } else if (action === "deselect-option" && option && option.value !== "*") {
        indexes.push(option.idx);
      } else if (action === "deselect-option" && option && option.value == "*") {
        indexes = allIndexes;
        visible = false
      } else if (action === "remove-value" && removedValue) {
        indexes.push(removedValue.idx);
      } else if (action === "clear") {
        indexes = allIndexes;
        visible = false;
      }
      indexes.forEach(idx => this.quickHandleChange(idx, visible));
    }

    const checks = () => {
      return this.state.quickColumns.map((cell, idx) => {
        const column = this.props.columns[cell.columnId];
        const title = column.title.replace(/<br\s*[\/]?>/gi, " ");
        return (
            <span key={idx}>
            <input className="checkbox-input" id={"quick" + idx} type="checkbox" checked={cell.visible}
                   onChange={() => this.quickHandleChange(idx)}/>
            <label htmlFor={"quick" + idx} className="rowIndex">{title} </label>
        </span>
        );
      })
    };

    const select = () => {
      const id = "quick-select-" + this.props.page;
      const showAllOption = {
        idx: "-1",
        columnId: "-1",
        value: "*",
        label: be5.messages.showAllColumns,
        checked: this.state.quickColumns.find(el => !el.visible) === undefined//if has false than unchecked
      }
      const options = this.state.quickColumns.length > 0 ? [showAllOption] : [];
      const values =  [];

      this.state.quickColumns.forEach((cell, idx) => {
        const column = this.props.columns[cell.columnId];
        const title = column.title.replace(/<br\s*[\/]?>/gi, " ");
        const option = {
          idx: idx,
          columnId: cell.columnId,
          value:  cell.columnId,
          label: title,
          checked: cell.visible
        }
        options.push(option);
        if (cell.visible) {
          values.push(option)
        }
      })

      const selectAttr = {
        id: id,
        ref: id,
        name: id,
        onChange: handleSelect,
        value: values,
        options: options,
        allowSelectAll: true,
        closeMenuOnSelect: false,
        hideSelectedOptions: false,
        isDisabled: false,
        isMulti: true,
        components: {Option},
        /*don't show value in input box*/
        controlShouldRenderValue: false,
        isClearable: false,
        backspaceRemovesValue: false,
        classNamePrefix: 'be5-select',
        /*menuIsOpen: true, uncomment for css debug*/
      };

      return (<Select {...selectAttr}/>);
    };
    const getQuickColumns = () => {
      if (this.props.layout && this.props.layout.quickType === "select") {
        return <div id="quickColumns" className="d-flex flex-row flex-wrap align-items-center">
                  <div>{be5.messages.otherColumns}:</div>
                  <div className="Select-outer select-container Select--sm ml-2" >{select()}</div>
               </div>

      } else {
        return <div id="quickColumns">
          <span id="checkbox-container">{be5.messages.otherColumns}:</span>
          {checks()}
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
