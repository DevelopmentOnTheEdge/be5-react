import React, {Component} from 'react';
import PropTypes          from 'prop-types';
import be5                from '../../be5';
import {getModelByID}     from '../../utils/documentUtils';
import forms              from '../../services/forms';
import numberFormatter    from 'number-format.js';
import OperationBox       from './OperationBox';
import QuickColumns       from './QuickColumns';
import Document           from "../../containers/Document";
import {registerDocument} from '../../core/documents';


class TableBox extends React.Component {
  constructor(props) {
    super(props);

    this.onOperationClick = this.onOperationClick.bind(this);
  }

  // componentDidMount() {
  //   if(this.refs.table)
  //     this.applyTableStyle(ReactDOM.findDOMNode(this.refs.table));
  //
  //   this._refreshEnablementIfNeeded();
  // }

  // componentWillReceiveProps(nextProps)
  // {
  //   $('#table' + this.props.value.meta._ts_).dataTable().fnDestroy();
  // }

  // componentWillUpdate() {
  //   if(this.refs.table)
  //     this.applyTableStyle(ReactDOM.findDOMNode(this.refs.table));
  // }

  // componentDidUnMount() {
  //   $('#table' + this.props.value.meta._ts_).dataTable().fnDestroy();
  // }

  onOperationClick(name) {
    const attr = this.props.value.data.attributes;

    const params = {
      entity: attr.category,
      query: attr.page || 'All records',
      operation: name,
      values: {},
      operationParams: attr.parameters
    };

    forms.load(params, {
      documentName: this.props.frontendParams.operationDocumentName || this.props.frontendParams.documentName,
      parentDocumentName: this.props.frontendParams.documentName
    });
  }

  onSelectionChange() {
    this._refreshEnablementIfNeeded();

    if (this.props.hasOwnProperty('callbacks') && this.props.callbacks !== undefined
      && this.props.callbacks.hasOwnProperty('onSelectionChange'))
    {
      this.props.callbacks.onSelectionChange(be5.tableState.selectedRows);
    }
  }
  //
  // applyTableStyle(node) {
  //   const attributes = this.props.value.data.attributes;
  //   if (attributes.columns.length === 0) return;
  //
  //   //$(node).empty();
  //   be5.tableState.selectedRows = [];
  //
  //   const _this = this;
  //
  //   const hasCheckBoxes = attributes.selectable;
  //   const editable = attributes.operations.filter((op) => op.name === 'Edit').length === 1;
  //
  //   let columnIndexShift = hasCheckBoxes ? 1 : 0;
  //
  //   const tableDiv = $('#table' + this.props.value.meta._ts_);
  //
  //   let lengths = [5,10,20,50,100,500,1000];
  //   const pageLength = attributes.length;
  //
  //   if (lengths.indexOf(pageLength) === -1) {
  //     lengths.push(pageLength);
  //     lengths.sort(function(a,b) {return a-b;});
  //   }
  //
  //   const lengthsTitles = lengths.map(x => x + ' записей');
  //
  //   lengths = [lengths, lengthsTitles];
  //
  //   let language = null;
  //   if(be5.locale.value !== 'en'){
  //     language = be5.messages.dataTables || {};
  //     language.lengthMenu = "_MENU_";
  //   }
  //
  //   const tableConfiguration = {
  //     dom: 'rt il p <"row">',
  //     processing: true,
  //     serverSide: true,
  //     language: language,
  //     searching: false,
  //     autoWidth: false,
  //     aaSorting: [],
  //     ajax: {
  //       url: utils.getBaseUrl() + be5.net.url('document/moreRows'),
  //       data: {
  //         entity: attributes.category,
  //         query: attributes.page,
  //         values: be5.net.paramString(attributes.parameters),
  //         selectable: attributes.selectable,
  //         totalNumberOfRows: attributes.totalNumberOfRows
  //       },
  //       dataSrc: function(d){
  //         if(d.type === "error"){
  //           be5.log.error(d.value.code + "\n" + d.value.message);
  //         }else{
  //           for(let i=0; i < d.data.length; i++){
  //             for(let j=0; j < d.data[0].length - columnIndexShift; j++){
  //               d.data[i][j + columnIndexShift] = formatCell(d.data[i][j + columnIndexShift].content, d.data[i][j + columnIndexShift].options)
  //             }
  //           }
  //         }
  //         return d.data;
  //       }
  //     },
  //     lengthMenu: lengths,
  //     pageLength: pageLength,
  //     // This both tells
  //     // that the first bunch of data is already loaded (so no request is required), and
  //     // which is the total length of the result.
  //     // See https://datatables.net/reference/option/deferLoading
  //     deferLoading: attributes.totalNumberOfRows,
  //     columnDefs: [
  //       {
  //         render: (data, type, row, meta) => {
  //           if (!hasCheckBoxes) {
  //             return row[0]; // default behavior
  //           }
  //           const val = row[0];
  //           const id = "row-" + val + "-checkbox";
  //           let display = meta.row+1;
  //           if(editable) {
  //             display = '<a href="#!'+be5.url.create('form', [attributes.category, attributes.page, 'Edit'], {selectedRows: val})+'">'+display+'</a>';
  //           }
  //           // Pure HTML! Have no idea how to convert some react.js to string.
  //           return '\
  //               <input id="{id}" type="checkbox" class="rowCheckbox"></input>\
  //               <label for="{id}" class="rowIndex"><span class="checkBox" ></span>{val}</label>'
  //             .replace('{id}', id)
  //             .replace('{id}', id)
  //             .replace('{val}', display);
  //         },
  //         targets: 0
  //       }, {
  //         render: (data, type, row) => {
  //           if (type === 'display') {
  //             const container = $('<div/>').html(formatCell(data));
  //             //be5.ui.convertLinks(container);
  //             return container.html();
  //           }
  //           return data;
  //         },
  //         targets: "_all"
  //       }
  //     ],
  //     createdRow(row, data, index) { // see http://datatables.net/examples/advanced_init/row_callback.html
  //       $('input', row).change(function() {
  //         const rowId = data[0];
  //         const checked = this.checked;
  //         if (checked && $.inArray(rowId, be5.tableState.selectedRows) == -1) {
  //           be5.tableState.selectedRows.push(rowId);
  //         } else if (!checked && $.inArray(rowId, be5.tableState.selectedRows) != -1) {
  //           be5.tableState.selectedRows.splice($.inArray(rowId, be5.tableState.selectedRows), 1);
  //         }
  //         _this.onSelectionChange();
  //       });
  //     }
  //   };
  //
  //   let groupingColumn = null;
  //   const nColumns = attributes.rows[0].cells.length;
  //   for (let i = 0; i < nColumns; i++) {
  //     const column = attributes.rows[0].cells[i];
  //     if (typeof column === 'object') {
  //       if ('options' in column) {
  //         if ('grouping' in column.options) {
  //           groupingColumn = i;
  //         }
  //       }
  //     }
  //   }
  //
  //   let drawGrouping;
  //
  //   if (groupingColumn !== null) {
  //     const resultGroupingColumn = columnIndexShift + groupingColumn;
  //     tableConfiguration.columnDefs.push({ visible: false, targets: resultGroupingColumn });
  //     drawGrouping = (api) => {
  //       const rows = api.rows({ page:'current' }).nodes();
  //       let last = null;
  //
  //       api.column(resultGroupingColumn, { page: 'current' }).data().each(function(group, i) {
  //         if (last !== group) {
  //           $(rows).eq(i).before('<tr class="table-group"><td colspan="' + nColumns + '">' + group + '</td></tr>');
  //           last = group;
  //         }
  //       });
  //     };
  //   }
  //
  //   tableConfiguration.drawCallback = (settings) => {
  //     if(this.refs && this.refs.table)
  //     {
  //       const dataTable = $(this.refs.table).find('table').dataTable();
  //       if (groupingColumn !== null) drawGrouping(dataTable.api());
  //     }
  //   };
  //
  //   tableDiv.dataTable(tableConfiguration);
  //
  //   tableDiv.on( 'draw.dt', function () {
  //     be5.tableState.selectedRows = [];
  //     _this._refreshEnablementIfNeeded();
  //   } );
  //
  //   //fix pagination position
  //   tableDiv.parent().css('margin', 0).css('width', tableDiv.width() + 32);
  //
  //   this.refs.quickColumns.setTable(this.refs.table);
  //
  //   this.onSelectionChange();
  // }

  static formatReactCell(data, options, isColumn)
  {
    if (!Array.isArray(data)) {
      if (data === '') {
        if (options && options.blankNulls && options.blankNulls.value)
          return options.blankNulls.value;
      }
    }else{
      data = data.map(row => row.join(', ')).join('<br/>');
    }

    if(options){
      if(options.format){
        data = numberFormatter(options.format.mask, data);
      }
      if(!isColumn && options.link) {
        data = $('<a>',{
          text: data,
          href: "#!" + options.link.url
        });
      }
      if(options.css || options === 'th') {
        const wrap = $('<div>');
        if(options.css && options.css.class) wrap.addClass(options.css.class);
        if(options === 'th')wrap.addClass("ta-center td-strong");
        data = wrap.html(data);
      }
    }
    if(data instanceof $){
      data = $('<div>').append($(data).clone()).html();
    }
    return data;
  }

  render() {
    const attributes = this.props.value.data.attributes;
    if (attributes.columns.length === 0) {
      return (
        <div>
          <OperationBox ref="operations" operations={attributes.operations} onOperationClick={this.onOperationClick} hasRows={attributes.rows.length !== 0}/>
          {be5.messages.emptyTable}
        </div>
      );
    }

    const hasCheckBoxes = attributes.selectable;

    const theadrow = [];

    if (hasCheckBoxes) {
      theadrow.push(<th key={-1}>#</th>);
    }

    attributes.columns.forEach((column, idx) => {
      const title = typeof column === 'object' ? column.title : column;

      theadrow.push(<th key={idx}>{title}</th>);//formatCell(title, 'th', true)
    });

    const trs = [];

    attributes.rows.forEach((row, rowId, rows) => {
      const tr = [];

      if (hasCheckBoxes) {
        tr.push(<td key={-1}>{row.id}</td>)
      }

      row.cells.forEach((cell, idx) => {
        tr.push(<td key={idx}>{cell.content}</td>)//formatCell(cell.content, cell.options)
      });

      trs.push(<tr key={rowId}>{tr}</tr>);
    });

    return (
      <div>
        <OperationBox ref="operations" operations={attributes.operations} onOperationClick={this.onOperationClick} hasRows={attributes.rows.length !== 0}/>
        <QuickColumns ref="quickColumns" columns={attributes.columns} firstRow={attributes.rows[0].cells} table={this.refs.table} selectable={attributes.selectable}/>
        <div className="scroll">
          <table
            id={"table" + this.props.value.meta._ts_}
            className="table table-striped table-bordered table-hover display table-sm"
            cellSpacing="0"
          >
            <thead>
              <tr>{theadrow}</tr>
            </thead>
            <tbody>
              {trs}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // _refreshEnablementIfNeeded() {
  //   if (this.refs !== undefined && this.refs.operations !== undefined) {
  //     this.refs.operations.refreshEnablement();
  //   }
  // }
}

//todo add register new component and move to condo, add base types
// class ListTableBox extends React.Component
// {
//   render(){
//     const list = this.props.value.data.attributes.rows.map( (col, idx) => {
//       return <li key={idx} dangerouslySetInnerHTML={ {__html: col.cells[0].content}}/>;
//     });
//
//     return (
//       <ul className="listTableBox">
//         {list}
//       </ul>
//     );
//   }
// }

class ReactTable extends React.Component
{
  constructor(props) {
    super(props);

    this.state = {runReload: ""}
  }

  render() {
    const value = this.props.value;
    //const reloadClass = "table-reload float-xs-right " + this.state.runReload;
    let table = null;

    // if(value.data.attributes.parameters && value.data.attributes.parameters.displayType === 'list')
    // {
    //   table = (
    //     <ListTableBox ref="tableBox" value={value} />
    //   )
    // }
    // else
    {
      table = (
        <TableBox
          ref="tableBox"
          value={value}
          frontendParams={this.props.frontendParams}
        />
      );
    }

    const TitleTag = `h${(value.data.attributes.parameters && value.data.attributes.parameters.titleLevel) || 1}`;

    //todo use getModelByID() instead getResourceByID()
    const topFormJson = value.included !== undefined ? getModelByID(value.included, value.meta, "topForm") : undefined;
    let topForm;
    if(topFormJson){
      topForm = <Document
        frontendParams={{documentName: "documentTopForm", parentDocumentName: this.props.frontendParams.documentName}}
        value={topFormJson}
      />
    }

    return (
      <div className="table-component">
        {topForm}
        <TitleTag className="table-component__title">{value.data.attributes.title}</TitleTag>
        {table}
      </div>
    );
  }


}

ReactTable.propTypes = {
  value: PropTypes.object.isRequired
};

registerDocument('rTable', ReactTable);

export default ReactTable;
