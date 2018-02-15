import React, {Component} from 'react';
import PropTypes       from 'prop-types';
import ReactDOM        from 'react-dom';
import be5             from '../../be5';
import utils           from '../../utils';
import $               from 'jquery';
import formService     from '../../services/forms';
import tableService    from '../../services/tables';
import numberFormatter from 'number-format.js';
import OperationBox    from './OperationBox';
import QuickColumns    from './QuickColumns';


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

class TableBox extends Component {
  constructor(props) {
    super(props);

    this.onOperationClick = this.onOperationClick.bind(this);
  }

  componentDidMount() {
    if(this.refs.table)
      this.applyTableStyle(ReactDOM.findDOMNode(this.refs.table));

    this._refreshEnablementIfNeeded();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(nextProps) !== JSON.stringify(this.props)
      || JSON.stringify(nextState) !== JSON.stringify(this.state);
  }

  componentDidUpdate() {
    if(this.refs.table)
      this.applyTableStyle(ReactDOM.findDOMNode(this.refs.table));
  }

  onOperationClick(name) {
    const attr = this.props.value.data.attributes;

    const params = {
      entity: attr.category,
      query: attr.page || 'All records',
      operation: name,
      values: {},
      operationParams: attr.parameters
    };

    formService.load(params, {
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
    const editable = attributes.operations.filter((op) => op.name === 'Edit').length === 1;
    let columnIndexShift = 0;

    if (hasCheckBoxes) {
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

    const tableDiv = $('<table class="display compact" cellspacing="0"/>')
      .append(thead)
      .append(tbody)
      .append( ( attributes.rows.length > 10 ? tfoot : ''))
      .appendTo(node);

    const lengths = [5,10,20,50,100,500,1000];
    const pageLength = attributes.length;

    if (lengths.indexOf(pageLength) === -1) {
      lengths.push(pageLength);
      lengths.sort(function(a,b) {return a-b;});
    }

    let language = null;
    if(be5.locale.value !== 'en'){
      language = be5.messages.dataTables;
    }

    const tableConfiguration = {
      processing: true,
      serverSide: true,
      language: language,
      searching: false,
      autoWidth: false,
      aaSorting: [],
      ajax: {
        url: utils.getBaseUrl() + be5.net.url('document/moreRows'),
        data: {
          entity: attributes.category,
          query: attributes.page,
          values: be5.net.paramString(attributes.parameters),
          selectable: attributes.selectable,
          totalNumberOfRows: attributes.totalNumberOfRows
        },
        dataSrc: function(d){
          if(d.type === "error"){
            be5.log.error(d.value.code + "\n" + d.value.message);
          }else{
            for(let i=0; i < d.data.length; i++){
              for(let j=0; j < d.data[0].length - columnIndexShift; j++){
                d.data[i][j + columnIndexShift] = formatCell(d.data[i][j + columnIndexShift].content, d.data[i][j + columnIndexShift].options)
              }
            }
          }
          return d.data;
        }
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
            if(editable) {
              display = '<a href="#!'+be5.url.create('form', [attributes.category, attributes.page, 'Edit'], {selectedRows: val})+'">'+display+'</a>';
            }
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
          if (checked && $.inArray(rowId, be5.tableState.selectedRows) == -1) {
            be5.tableState.selectedRows.push(rowId);
          } else if (!checked && $.inArray(rowId, be5.tableState.selectedRows) != -1) {
            be5.tableState.selectedRows.splice($.inArray(rowId, be5.tableState.selectedRows), 1);
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

    const hideControls = () => {
      if ( $(_this.refs.table).find('.paging_simple_numbers span .paginate_button')
        && $(_this.refs.table).find('.paging_simple_numbers span .paginate_button').length > 1) {
        $(_this.refs.table).find('.dataTables_length').show();
        $(_this.refs.table).find('.paging_simple_numbers').show()
      } else {
        $(_this.refs.table).find('.dataTables_length').hide();
        $(_this.refs.table).find('.paging_simple_numbers').hide()
      }
    };

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

    tableDiv.on( 'draw.dt', function () {
      be5.tableState.selectedRows = [];
      _this._refreshEnablementIfNeeded();
    } );

    this.refs.quickColumns.setTable(this.refs.table);

    this.onSelectionChange();
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

    return (
      <div>
        <OperationBox ref="operations" operations={attributes.operations} onOperationClick={this.onOperationClick} hasRows={attributes.rows.length !== 0}/>
        <QuickColumns ref="quickColumns" columns={attributes.columns} firstRow={attributes.rows[0].cells} table={this.refs.table} selectable={attributes.selectable}/>
        <div className="scroll">
          <div ref="table"/>
        </div>
      </div>
    );
  }

  _refreshEnablementIfNeeded() {
    if (this.refs !== undefined && this.refs.operations !== undefined) {
      this.refs.operations.refreshEnablement();
    }
  }
}

//todo add register new component and move to condo, add base types
class ListTableBox extends Component
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

class Table extends Component
{
  constructor(props) {
    super(props);

    this.state = {runReload: ""}
  }

  render() {
    const value = this.props.value;
    //const reloadClass = "table-reload float-xs-right " + this.state.runReload;
    let table = null;

    if(value.data.attributes.parameters && value.data.attributes.parameters.displayType === 'list')
    {
      table = (
        <ListTableBox ref="tableBox" value={value} />
      )
    }
    else
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

    return (
      <div className="table-component">
        <TitleTag className="table-component__title">{value.data.attributes.title}</TitleTag>
        {table}
      </div>
    );
  }

  refresh() {
    const attr = this.props.value.data.attributes;
    const params = {
        entity: attr.category,
        query: attr.page,
        params: attr.parameters
    };

    tableService.refresh(params, this.props.frontendParams.documentName);
  }

}

Table.propTypes = {
  value: PropTypes.object.isRequired
};

export default Table;
