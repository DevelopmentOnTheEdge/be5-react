import React           from 'react';
import ReactDOM        from 'react-dom';
import be5             from '../../be5';
import $               from 'jquery';
import Action          from '../action';
import _               from 'underscore';
import formAction      from '../../actions/form';
import numberFormatter from 'number-format.js';
import DataTables     from 'datatables';

//import reloadImg from '../../../images/reload.png';

const OperationBox = React.createClass({displayName: "OperationBox",
  onClick(name, e) {
    if (!$(ReactDOM.findDOMNode(this.refs[name])).hasClass('disabled')) {
      var operation = this.props.operations.find(operation => operation.name === name);
      if (!operation.requiresConfirmation || confirm(operation.title + "?")) {
        this.props.onOperationClick(name);
      }
    }
    e.preventDefault();
  },
  
  refreshEnablement() {
    this.props.operations.forEach(operation => {
      var visible = false;
      switch (operation.visibleWhen) {
      case 'always':
        visible = true;
        break;
      case 'oneSelected':
        visible = (be5.tableState.selectedRows.length == 1);
        break;
      case 'anySelected':
        visible = (be5.tableState.selectedRows.length != 0);
        break;
      case 'hasRecords':
        visible = this.props.hasRows;
        break;
      }
      if (visible) {
        $(ReactDOM.findDOMNode(this.refs[operation.name])).addClass('enabled');
        $(ReactDOM.findDOMNode(this.refs[operation.name])).removeClass('disabled');
      } else {
        $(ReactDOM.findDOMNode(this.refs[operation.name])).addClass('disabled');
        $(ReactDOM.findDOMNode(this.refs[operation.name])).removeClass('enabled');
      }
    });
  },
  
  render() {
    const splitWithSpaces = function(elements) {
      const out = [];
      _(elements).each(e => {
        if (out.length !== 0) {
          out.push(' ');
        }
        out.push(e);
      });
      return out;
    };
    var operations = this.props.operations.map(operation => {
//      if (operation.isClientSide) {
//        const action = Action.parse(operation.action);
//        const attrs = {
//          key: operation.name,
//          ref: operation.name,
//          href: action.href,
//          target: action.target,
//          className: 'btn btn-secondary'
//        };
//        return React.createElement('a', attrs, operation.title);
//      }
      return (
        React.createElement('a', {key: operation.name, ref: operation.name, href: '', onClick: this.onClick.bind(this, operation.name), className: 'btn btn-secondary btn-md'}, operation.title)
      );
    });

    if(this.props.operations.length == 0){
      return (
          <div></div>
      );
    }
    return (
      React.createElement('div', {className: 'operationList'}, 
        splitWithSpaces(operations)
      )
    );
  }
});

const QuickColumns = React.createClass({

  getInitialState: function(){
    return this.createStateFromProps(this.props);
  },

  componentWillReceiveProps(nextProps){
    this.setState(this.createStateFromProps(nextProps));
  },

  createStateFromProps(props){
    return {quickColumns:
      props.firstRow
       .map( (col, idx) => {
         if(col.options.quick)
           return {columnId: idx, visible: col.options.quick.visible == 'true'}
         else return null;
       })
       .filter((col) => {return col !== null})
    };
  },

  setTable(_table){
      this.setState({table: _table});
  },

  quickHandleChange(idx) {
    this.state.quickColumns[idx].visible = !this.state.quickColumns[idx].visible;
    this.forceUpdate();
  },

  render() {
    if(this.state.quickColumns.length == 0){
       return (<div></div>)
    }
    if(this.state.table){
      var dataTable = $(this.state.table).find('table').dataTable();
      var columnsCount = dataTable.fnSettings().aoColumns.length ;
      this.state.quickColumns.forEach((col) => {
          const columnId = col.columnId + (this.props.selectable ? 1 : 0);
          if(columnId < columnsCount){
            var dtColumn = dataTable.api().column( columnId );
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
});

const formatCell = (data, options, isColumn) => {
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
    if(options.css || options === 'th'){
      const wrap = $('<div>');
      if(options.css && options.css.class) wrap.addClass(options.css.class);
      if(options === 'th')wrap.addClass("ta-center td-strong");
      data = wrap.html(data);
    }
    if(!isColumn && options.link) {
      data = $('<a>',{
        text: data,
        href: "#!" + options.link.url
      });
    }
  }
  if(data instanceof jQuery){
    data = $('<div>').append($(data).clone()).html();
  }
  return data;
};

const TableBox = React.createClass({
  
  displayName: 'TableBox',
  
  componentDidMount() {
    if(this.refs.table)
      this.applyTableStyle(ReactDOM.findDOMNode(this.refs.table));
    
    this._refreshEnablementIfNeeded();
    //this._loadCountIfNeeded();
  },
  
  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(nextProps) !== JSON.stringify(this.props)
      || JSON.stringify(nextState) !== JSON.stringify(this.state);
  },
  
  componentDidUpdate() {
    if(this.refs.table)
      this.applyTableStyle(ReactDOM.findDOMNode(this.refs.table));
    
    //this._loadCountIfNeeded();
  },
  
  onOperationClick(name) {
    if(this.props.operationDocumentName === be5.documentName)
    {
      be5.url.set(be5.url.create('form', [this.props.category, this.props.page, name], this.props.parameters));
    }
    else
    {
      formAction(this.props.operationDocumentName, this.props.category, this.props.page, name,
        this.props.parameters, this.props.onChange);
      // be5.url.process(
      //     this.props.operationDocumentName,
      //     "#!" + be5.url.create('form', [this.props.category, this.props.page, name], this.props.parameters)
      // );

    }
  },
  
  onSelectionChange() {
    this._refreshEnablementIfNeeded();
    
    if (this.props.hasOwnProperty('callbacks') && this.props.callbacks !== undefined
      && this.props.callbacks.hasOwnProperty('onSelectionChange'))
    {
      this.props.callbacks.onSelectionChange(be5.tableState.selectedRows);
    }
  },
  applyTableStyle(node) {
    // see http://datatables.net/examples/index
    $(node).empty();
    if (this.props.columns.length == 0) return;
    
    const _this = this;
    be5.tableState.selectedRows = [];
    
    const thead = $('<thead>');
    const theadrow = $('<tr>').appendTo(thead);
    const tbody = $('<tbody>');
    const tfoot = $('<tfoot>');
    const tfootrow = $('<tr>').appendTo(tfoot);
    const hasCheckBoxes = this.props.selectable;
    const editable = this.props.operations.filter((op) => op.name === 'Edit').length === 1;
    let columnIndexShift = 0;
    
    if (hasCheckBoxes) {
      theadrow.append($("<th>").text("#"));
      tfootrow.append($("<th>").text("#"));
      columnIndexShift = 1;
    }

    this.props.columns.forEach((column, idx) => {
      const title = typeof column === 'object' ? column.title : column;
      theadrow.append($("<th>").html( formatCell(title, 'th', true) ));
      tfootrow.append($("<th>").html( formatCell(title, 'th', true) ));
    });
    this.props.rows.forEach((row, rowId, rows) => {
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
      .append( ( this.props.rows.length > 10 ? tfoot : ''))
      .appendTo(node);

    const lengths = [10,20,50,100,500,1000];
    const pageLength = this.props.length;
    
    if (lengths.indexOf(pageLength) == -1) {
      lengths.push(pageLength);
      lengths.sort(function(a,b) {return a-b;});
    }

    var language = null;
    if(be5.locale.value != 'en'){
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
        url: be5.net.url('document/moreRows'),
        data: {
          entity: this.props.category,
          query: this.props.page,
          values: be5.net.paramString(this.props.parameters),
          selectable: this.props.selectable,
          totalNumberOfRows: this.props.totalNumberOfRows
        },
        dataSrc: function(d){
          if(d.type === "error"){
            be5.log.error(d.value.code + "\n" + d.value.message);
          }else{
            for(var i=0; i < d.data.length; i++){
              for(var j=0; j < d.data[0].length - columnIndexShift; j++){
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
      deferLoading: this.props.totalNumberOfRows,
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
              display = '<a href="#!'+be5.url.create('form', [this.props.category, this.props.page, 'Edit'], {selectedRows: val})+'">'+display+'</a>';
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
    const nColumns = this.props.rows[0].cells.length;
    for (let i = 0; i < nColumns; i++) {
      const column = this.props.rows[0].cells[i];
      if (typeof column === 'object') {
        if ('options' in column) {
          if ('grouping' in column.options) {
            groupingColumn = i;
          }
        }
      }
    }

    var hideControls = function(){
      if ( $(_this.refs.table).find('.paging_simple_numbers span .paginate_button')
           && $(_this.refs.table).find('.paging_simple_numbers span .paginate_button').length > 1) {
        $(_this.refs.table).find('.dataTables_length').show();
        $(_this.refs.table).find('.paging_simple_numbers').show()
      } else {
        $(_this.refs.table).find('.dataTables_length').hide();
        $(_this.refs.table).find('.paging_simple_numbers').hide()
      }
    }

    if (groupingColumn !== null) {
      const resultGroupingColumn = columnIndexShift + groupingColumn;
      tableConfiguration.columnDefs.push({ visible: false, targets: resultGroupingColumn });
      var drawGrouping = function(api) {
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

    tableConfiguration.drawCallback = function(settings) {
      if (groupingColumn !== null)drawGrouping(this.api());
      hideControls();
    };

    tableDiv.dataTable(tableConfiguration);

    this.refs.quickColumns.setTable(this.refs.table);

    this.onSelectionChange();
  },

  render() {
    if (this.props.columns.length == 0) {
      return (
        <div>
          <OperationBox ref="operations" operations={this.props.operations} onOperationClick={this.onOperationClick} hasRows={this.props.rows.length != 0}/>
          {be5.messages.emptyTable}
        </div>
      );
    }
    
    return (
      <div>
        <OperationBox ref="operations" operations={this.props.operations} onOperationClick={this.onOperationClick} hasRows={this.props.rows.length != 0}/>
        <QuickColumns ref="quickColumns" columns={this.props.columns} firstRow={this.props.rows[0].cells} table={this.refs.table} selectable={this.props.selectable}/>
        <div className="scroll">
          <div ref="table"/>
        </div>
      </div>
    );
  },
  
  // _loadCountIfNeeded() {
  //   if (this.props.embedded) { // FIXME actually this should work even if the component is embedded
  //     return;
  //   }
  //
  //   if (this.props.value.type === 'table' && !this.props.totalNumberOfRows && this.props.totalNumberOfRows != 0) {
  //     be5.net.request('document/count', this.props.value.requestParams, res => {
  //       const documentState = {
  //         time: Date.now(),
  //         type: 'table',
  //         value: _.extend({}, this.props.value, {totalNumberOfRows: res.value})
  //       };
  //
  //       changeDocument(documentState);
  //     });
  //   }
  // },
  
  _refreshEnablementIfNeeded() {
    if (this.refs !== undefined && this.refs.operations !== undefined) {
      this.refs.operations.refreshEnablement();
    }
  }
});

const Table = React.createClass({
  propTypes: {
    value: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return { runReload: "" };
  },
  
  displayName: 'Table',
  
  render() {
    const value = this.props.value;
    //const reloadClass = "table-reload float-xs-right " + this.state.runReload;

    return (
      <div className="table-component">
        <h1 className="table-component__title">{value.title}</h1>
        <TableBox
          ref="tableBox"
          category={value.category} 
          page={value.page}
          operations={value.operations} 
          selectable={value.selectable} 
          columns={value.columns}
          rows={value.rows}
          length={value.length}
          parameters={value.parameters} 
          totalNumberOfRows={value.totalNumberOfRows}
          hasAggregate={value.hasAggregate}
          callbacks={value.callbacks}
          embedded={value.embedded}
          value={value}
          operationDocumentName={this.props.operationDocumentName}
          onChange={this.props.onChange}
        />
      </div>
    );
  },

  // componentWillUpdate() {
  //   if(this.state.runReload != "")this.setState({ runReload: "" });
  // },
//todo move to document
//<span onClick={this._reload} className={reloadClass}>
//          <img src={reloadImg} alt={be5.messages.reload} title={be5.messages.reload}/>
//        </span>
//   _reload() {
//     const value = this.props.value;
//     this.setState({ runReload: "active" });
//     Tables.load({ entity: value.category, query: value.page || 'All records', params: value.parameters, options: { embedded: false } }, changeDocument);
//   }

});

export default Table;
