import React, {Component} from 'react';
import PropTypes          from 'prop-types';
import ReactDOM           from 'react-dom';
import be5                from '../../be5';
import {getModelByID, getResourceByType, getSelfUrl} from '../../utils/documentUtils';
import forms              from '../../services/forms';
import numberFormatter    from 'number-format.js';
import OperationBox       from './OperationBox';
import QuickColumns       from './QuickColumns';
import Document           from "../../containers/Document";
import {registerDocument} from '../../core/documents';
import {updateTable}      from "../../services/tables";
import CategoryNavigation from "./CategoryNavigation";
import {executeFrontendActions} from "../../services/frontendActions";
import {updateLocationHashIfNeeded} from "../../services/documents";
import FrontendAction from "../../services/model/FrontendAction";
import {GO_BACK, OPEN_DEFAULT_ROUTE} from "../../constants";


const formatCell = (data, options, isColumn) =>
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
};

class TableBox extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(this.refs.table)
      this.applyTableStyle(ReactDOM.findDOMNode(this.refs.table));

    this.props._refreshEnablementIfNeeded();
  }

  componentDidUpdate() {
    if(this.refs.table)
      this.applyTableStyle(ReactDOM.findDOMNode(this.refs.table));
  }

  onSelectionChange() {
    this.props._refreshEnablementIfNeeded();

    if (this.props.hasOwnProperty('callbacks') && this.props.callbacks !== undefined
      && this.props.callbacks.hasOwnProperty('onSelectionChange'))
    {
      this.props.callbacks.onSelectionChange(be5.tableState.selectedRows);
    }
  }
  applyTableStyle(node) {
    // see http://datatables.net/examples/index
    $(node).empty();
    const attributes = this.props.value.data.attributes;
    if (attributes.columns.length === 0) return;

    const _this = this;
    be5.tableState.selectedRows = [];

    const thead = $('<thead>');
    const theadrow = $('<tr>').appendTo(thead);
    const tbody = $('<tbody>');
    const tfoot = $('<tfoot>');
    const tfootrow = $('<tr>').appendTo(tfoot);
    const hasCheckBoxes = attributes.selectable;
    //const editable = attributes.operations.filter((op) => op.name === 'Edit').length === 1;
    let columnIndexShift = 0;

    if (hasCheckBoxes) {
      //theadrow.append($("<th>").html('<input id="rowCheckboxAll" type="checkbox" class=""/>'));
      theadrow.append($("<th>").text("#"));
      tfootrow.append($("<th>").text("#"));
      columnIndexShift = 1;
    }

    attributes.columns.forEach((column, idx) => {
      const title = typeof column === 'object' ? column.title : column;
      theadrow.append($("<th>").html( formatCell(title, 'th', true) ));
      tfootrow.append($("<th>").html( formatCell(title, 'th', true) ));
    });
    attributes.rows.forEach((row, rowId, rows) => {
      const tr = $('<tr>');
      row.cells.forEach((cell, idx) => {
        tr.append($('<td>').html(formatCell(cell.content, cell.options)));
      });
      if (hasCheckBoxes) {
        tr.prepend($('<td>').text(row.id));
      }
      tbody.append(tr);
    });

    const tableDiv = $('<table id="' + this.props.value.meta._ts_ + '" '
          + 'class="table table-striped table-striped-light table-bordered display table-sm" cellspacing="0"/>')
      .append(thead)
      .append(tbody)
      .append( ( attributes.rows.length > 10 ? tfoot : ''))
      .appendTo(node);

    let lengths = [5,10,20,50,100,500,1000];
    const pageLength = attributes.length;

    let tableDom = 'r <"table-responsive-md"t> <"dataTables-nav clearfix"pli>';

    if (lengths.indexOf(pageLength) === -1) {
      if(pageLength < 5)
      {
        tableDom = tableDom.replace("pli", "pi");
      }
      else
      {
        lengths.push(pageLength);
        lengths.sort(function(a,b) {return a-b;});
      }
    }

    const lengthsTitles = lengths.map(x => x + ' ' + be5.locale.msg('entries'));

    lengths = [lengths, lengthsTitles];

    let language = {};
    if(be5.locale.value !== 'en'){
      language = be5.messages.dataTables || {};
    }
    language.lengthMenu = "_MENU_";

    const tableConfiguration = {
      dom: tableDom,
      processing: true,
      serverSide: true,
      language: language,
      searching: false,
      autoWidth: false,
      aaSorting: [],
      displayStart: attributes.offset,
      order: attributes.orderColumn >= 0 ? [[ attributes.orderColumn, attributes.orderDir ]] : undefined,
      ajax: function (data, callback, settings) {
        const params = {
          entity: attributes.category,
          query: attributes.page,
          params: Object.assign({}, attributes.parameters, {
            _offset_     : data.start,
            _limit_      : data.length,
          })
        };
        if(data.order && data.order.length > 0){
          params.params._orderColumn_ = data.order[0].column;
          params.params._orderDir_    = data.order[0].dir;
        }
        updateTable(params, function(jsonApiModel){
          const json = jsonApiModel.data.attributes;
          if(json.type === "error"){
            be5.log.error(json.value.code + "\n" + json.value.message);
          }else{
            for(let i=0; i < json.data.length; i++){
              for(let j=0; j < json.data[0].length - columnIndexShift; j++){
                json.data[i][j + columnIndexShift] = formatCell(json.data[i][j + columnIndexShift].content, json.data[i][j + columnIndexShift].options)
              }
            }
          }

          // call react callback - update table and filter operations
          // $.get('myUrl', function(newDataArray) {
          //   datatable.clear();
          //   datatable.rows.add(newDataArray);
          //   datatable.draw();
          // });
          return callback(json);
        });
      },
      lengthMenu: lengths,
      pageLength: pageLength,
      // This both tells
      // that the first bunch of data is already loaded (so no request is required), and
      // which is the total length of the result.
      // See https://datatables.net/reference/option/deferLoading
      deferLoading: attributes.totalNumberOfRows,
      columnDefs: [
        {
          render: (data, type, row, meta) => {
            if (!hasCheckBoxes) {
              return row[0]; // default behavior
            }
            const val = row[0];
            const id = "row-" + val + "-checkbox";
            let display = meta.row+1;

            // if(editable) {
            //   display = '<a href="#!'+be5.url.create(['form', attributes.category, attributes.page, 'Edit'], {selectedRows: val})+'">'+display+'</a>';
            // }
            // Pure HTML! Have no idea how to convert some react.js to string.
            return '\
                <input id="{id}" type="checkbox" class="rowCheckbox"></input>\
                <label for="{id}" class="rowIndex"><span class="checkBox" ></span>{val}</label>'
              .replace('{id}', id)
              .replace('{id}', id)
              .replace('{val}', display);
          },
          targets: 0
        }, {
          render: (data, type, row) => {
            if (type === 'display') {
              const container = $('<div/>').html(formatCell(data));
              //be5.ui.convertLinks(container);
              return container.html();
            }
            return data;
          },
          targets: "_all"
        }
      ],
      createdRow(row, data, index) { // see http://datatables.net/examples/advanced_init/row_callback.html
        $('input', row).change(function() {
          const rowId = data[0];
          const checked = this.checked;
          if (checked && $.inArray(rowId, be5.tableState.selectedRows) === -1) {
            be5.tableState.selectedRows.push(rowId);
            // if(attributes.rows.length === be5.tableState.selectedRows.length){
            //   $('#rowCheckboxAll').prop('checked', true);
            // }
          } else if (!checked && $.inArray(rowId, be5.tableState.selectedRows) !== -1) {
            be5.tableState.selectedRows.splice($.inArray(rowId, be5.tableState.selectedRows), 1);
            //$('#rowCheckboxAll').prop('checked', false);
          }
          _this.onSelectionChange();
        });
      }
    };
    let groupingColumn = null;
    const nColumns = attributes.rows[0].cells.length;
    for (let i = 0; i < nColumns; i++) {
      const column = attributes.rows[0].cells[i];
      if (typeof column === 'object') {
        if ('options' in column) {
          if ('grouping' in column.options) {
            groupingColumn = i;
          }
        }
      }
    }

    // const hideControls = () => {
    //   if ( $(_this.refs.table).find('.paging_simple_numbers span .paginate_button')
    //     && $(_this.refs.table).find('.paging_simple_numbers span .paginate_button').length > 1) {
    //     $(_this.refs.table).find('.dataTables_length').show();
    //     $(_this.refs.table).find('.paging_simple_numbers').show()
    //   } else {
    //     $(_this.refs.table).find('.dataTables_length').hide();
    //     $(_this.refs.table).find('.paging_simple_numbers').hide()
    //   }
    // };

    let drawGrouping;

    if (groupingColumn !== null) {
      const resultGroupingColumn = columnIndexShift + groupingColumn;
      tableConfiguration.columnDefs.push({ visible: false, targets: resultGroupingColumn });
      drawGrouping = (api) => {
        const rows = api.rows({ page:'current' }).nodes();
        let last = null;

        api.column(resultGroupingColumn, { page: 'current' }).data().each(function(group, i) {
          if (last !== group) {
            $(rows).eq(i).before('<tr class="table-group"><td colspan="' + nColumns + '">' + group + '</td></tr>');
            last = group;
          }
        });
      };
    }

    tableConfiguration.drawCallback = (settings) => {
      if(this.refs && this.refs.table)
      {
        const dataTable = $(this.refs.table).find('table').dataTable();
        if (groupingColumn !== null) drawGrouping(dataTable.api());
      }
      //hideControls();
    };

    tableDiv.dataTable(tableConfiguration);

    $('.dataTables_length select').removeClass('form-control-sm');

    tableDiv.on( 'draw.dt', function () {
      be5.tableState.selectedRows = [];
      _this.props._refreshEnablementIfNeeded();
    } );

    // $('#rowCheckboxAll').click(function (e) {
    //   e.stopPropagation();
    //
    //   if (!$('#rowCheckboxAll').prop('checked')) {
    //     $('.rowCheckbox').prop('checked', false);
    //     be5.tableState.selectedRows = [];
    //   }else{
    //     $('.rowCheckbox').prop('checked', true);
    //
    //     for(let i=0; i< attributes.rows.length; i++){
    //       be5.tableState.selectedRows.push(attributes.rows[i].id);
    //     }
    //   }
    //
    //   _this.onSelectionChange();
    // });

    this.refs.quickColumns.setTable(this.refs.table);

    this.onSelectionChange();
  }

  render() {
    const {attributes} = this.props.value.data;

    if (this.props.value.data.attributes.rows.length === 0) {
      return (
        <div>
          {be5.messages.emptyTable}
        </div>
      );
    }

    return (
      <div>
        <QuickColumns
          ref="quickColumns"
          columns={attributes.columns}
          rows={attributes.rows}
          table={this.refs.table}
          selectable={attributes.selectable}
        />
        <div className="">
          <div ref="table" className="row"/>
        </div>
      </div>
    );
  }

}

//todo add register new component and move to condo, add base types
class ListTableBox extends React.Component
{
  render(){
    const list = this.props.value.data.attributes.rows.map( (col, idx) => {
      return <li key={idx} dangerouslySetInnerHTML={ {__html: col.cells[0].content}}/>;
    });

    return (
      <ul className="listTableBox">
        {list}
      </ul>
    );
  }
}

class Table extends React.Component
{
  constructor(props) {
    super(props);

    this.state = {runReload: ""};
    this.onOperationClick = this.onOperationClick.bind(this);
    this._refreshEnablementIfNeeded = this._refreshEnablementIfNeeded.bind(this);
  }

  onOperationClick(operation) {
    const frontendParams = {
      documentName: this.props.frontendParams.operationDocumentName || this.props.frontendParams.documentName,
      parentDocumentName: this.props.frontendParams.documentName
    };

    if(operation.clientSide === true)
    {
      executeFrontendActions(JSON.parse(operation.action), frontendParams);
      return;
    }

    const name = operation.name;
    const attr = this.props.value.data.attributes;

    let operationParams;

    if (be5.tableState.selectedRows.length > 0) {
      operationParams = Object.assign({}, attr.parameters, {"_selectedRows_": be5.tableState.selectedRows.join()});
    } else {
      operationParams = attr.parameters;
    }

    const params = {
      entity: attr.category,
      query: attr.page || 'All records',
      operation: name,
      values: {},
      operationParams: operationParams
    };

    forms.load(params, frontendParams);
  }

  componentDidMount() {
    updateLocationHashIfNeeded(this.props);
  }

  render() {
    const value = this.props.value;
    const {data, included} = this.props.value;
    const hasRows = data.attributes.rows.length !== 0;

    //const reloadClass = "table-reload float-xs-right " + this.state.runReload;
    let table = null;

    if(value.data.attributes.parameters && value.data.attributes.parameters._displayType_ === 'list')
    {
      table = (
        <ListTableBox ref="tableBox" value={value} />
      )
    }
    else
    {
      table = (
        <TableBox
          _refreshEnablementIfNeeded={this._refreshEnablementIfNeeded}
          ref="tableBox"
          value={value}
          frontendParams={this.props.frontendParams}
        />
      );
    }

    const TitleTag = `h${(value.data.attributes.parameters && value.data.attributes.parameters._titleLevel_) || 1}`;

    const topFormJson = value.included !== undefined ? getModelByID(value.included, value.meta, "topForm") : undefined;
    let topForm;
    let hideOperations = data.attributes.layout.hideOperations || [];
    if(topFormJson){
      hideOperations.push(topFormJson.data.attributes.operation);
      topForm = <Document
        frontendParams={{documentName: "documentTopForm", parentDocumentName: this.props.frontendParams.documentName}}
        value={topFormJson}
      />
    }

    return (
      <div className="table-component">
        {topForm}
        <TitleTag className="table-component__title">{value.data.attributes.title}</TitleTag>
        <CategoryNavigation
          data={getResourceByType(included, "documentCategories")}
          url={getSelfUrl(this.props.value)}
        />
        <OperationBox
          ref="operations"
          operations={getResourceByType(included, "documentOperations")}
          onOperationClick={this.onOperationClick}
          hasRows={hasRows}
          hideOperations={hideOperations}
        />
        {table}
        {this._createCancelAction()}
      </div>
    );
  }

  /**
   * layout: '{"cancelActionText":"Back"}'
   * layout: '{"cancelAction": {"type": "SET_URL","value":"text/test123"}}'
   */
  _createCancelAction() {
    const layout = this.props.value.data.attributes.layout;

    if (layout.hasOwnProperty('cancelAction') || layout.cancelActionText ||
        this.props.frontendParams.documentName === be5.MAIN_DOCUMENT)
    {
      const action = layout.cancelAction || this.getDefaultCancelAction();

      return (
        <button type="button" className="btn btn-light mt-2" onClick={() => executeFrontendActions(action, this.props.frontendParams)}>
          {layout.cancelActionText || be5.messages.back}
        </button>
      );
    }else{
      return null;
    }
  }

  getDefaultCancelAction() {
    if(window.history.length > 1){
      return new FrontendAction(GO_BACK);
    }else{
      return new FrontendAction(OPEN_DEFAULT_ROUTE);
    }
  }

  _refreshEnablementIfNeeded() {
    this.refs.operations.refreshEnablement();
  }
}

Table.propTypes = {
  value: PropTypes.object.isRequired
};

registerDocument('table', Table);

export default Table;
