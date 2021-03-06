import React, {Component} from 'react';
import be5 from '../../../be5';
import {addUrlHandlers} from '../../../utils/documentUtils';
import QuickColumns from '../QuickColumns';
import {jQueryFormatCell, loadTableByUrl, updateTable} from "../../../services/tables";
import {
  CONTEXT_PARAMS,
  ENTITY_NAME_PARAM, LIMIT, OFFSET,
  ORDER_COLUMN, ORDER_DIR,
  QUERY_NAME_PARAM,
  TOTAL_NUMBER_OF_ROWS
} from "../../../constants";
import {registerTableBox} from "../../../core/registers/tableBoxes";
import bus from "../../../core/bus";
import {clearTableFilter} from "../../../services/tables";
import {initFilterParams} from "../../../utils/filterUtils";
import TablePagination from "../TablePagination";

/**
 * https://datatables.net/
 * https://habr.com/ru/post/330656/
 * https://medium.com/@zbzzn/integrating-react-and-datatables-not-as-hard-as-advertised-f3364f395dfa
 */
class DataTablesWrapper extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.applyTable(this.props, this.refs.main);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.value.meta._ts_ > this.props.value.meta._ts_) {
      const handler = setTimeout(() => {
        $("#" + getTableId(this.props)).DataTable().destroy(true);
        $(this.refs.main).empty();
        this.applyTable(nextProps, this.refs.main);
      }, 1);
      return () => clearTimeout(handler);
    }
    return false
  }

  componentWillUnmount() {
    $("#" + getTableId(this.props)).DataTable().destroy(true);
  }

  applyTable(props, node) {
    if (!hasRows(props.value.data.attributes)) return;

    const tableTag = $('<table id="' + getTableId(props) + '" '
      + 'class="table table-striped table-striped-light table-bordered display table-sm" cellspacing="0"/>');
    tableTag.appendTo(node);

    tableTag.dataTable(this.getTableConfiguration(props));

    $('.dataTables_length select').removeClass('form-control-sm');

    tableTag.on("click", '.edit-operation-btn', function (e) {
      if(!e.ctrlKey) {
        e.preventDefault();
        props.onOperationClick(DataTablesWrapper.getEditOperation(props), $(this).data("val"));
      }
    });

    tableTag.on("click", 'th.default_order', function (e) {
      e.preventDefault();
      $("#" + getTableId(props)).DataTable()
        .order([])
        .draw();
    });

    addUrlHandlers(tableTag, props.frontendParams.documentName);

    tableTag.on('draw.dt', function () {
      props.setSelectedRows([]);
    });

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
    // });

    bus.fire("updateDataTableQuickColumns");
  }

  getTableConfiguration(props) {
    const attributes = props.value.data.attributes;
    const hasCheckBoxes = attributes.selectable;
    const editOperation = DataTablesWrapper.getEditOperation(props);

    let lengths = [5, 10, 20, 50, 100, 500, 1000];
    const pageLength = attributes.length;

    let tableDom = 'r <"table-responsive-md"t> <"dataTables-nav clearfix"pli>';

    if (lengths.indexOf(pageLength) === -1) {
      if (pageLength < 5) {
        tableDom = tableDom.replace("pli", "pi");
      }
      else {
        lengths.push(pageLength);
        lengths.sort(function (a, b) {
          return a - b;
        });
      }
    }

    const lengthsTitles = lengths.map(x => x + ' ' + be5.locale.msg('entries'));

    lengths = [lengths, lengthsTitles];

    let language = {};
    if (be5.locale.value !== 'en') {
      language = be5.messages.dataTables || {};
    }
    language.lengthMenu = "_MENU_";

    const tableConfiguration = {
      data: this.getData(props),
      columns: this.getColumns(props),
      dom: tableDom,
      processing: true,
      serverSide: true,
      language: language,
      searching: false,
      autoWidth: false,
      aaSorting: [],
      displayStart: attributes.offset,
      order: attributes.orderColumn >= 0 ? [[attributes.orderColumn, attributes.orderDir]] : undefined,
      ajax: function (data, callback, settings) {
        clearTableFilter(attributes.category, attributes.page, attributes.parameters);
        const params = initFilterParams(attributes.parameters);
        params[OFFSET] = data.start;
        params[LIMIT] = data.length;
        if (data.order && data.order.length > 0) {
          params[ORDER_COLUMN] = data.order[0].column;
          params[ORDER_DIR] = data.order[0].dir;
        }
        if (attributes.totalNumberOfRows !== undefined) {
          params[TOTAL_NUMBER_OF_ROWS] = attributes.totalNumberOfRows;
        }

        const requestParams = {
          [ENTITY_NAME_PARAM]: attributes.category,
          [QUERY_NAME_PARAM]: attributes.page,
          [CONTEXT_PARAMS]: params
        };
        updateTable(requestParams, function (jsonApiModel) {
          const json = jsonApiModel.data.attributes;
          if (json.type === "error") {
            be5.log.error(json.value.code + "\n" + json.value.message);
          } else {
            for (let i = 0; i < json.data.length; i++) {
              for (let j = 0; j < json.data[0].length; j++) {
                json.data[i][j] = jQueryFormatCell(json.data[i][j].content, json.data[i][j].options)
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
            const val = row[0];
            if (val === 'aggregate') return '';

            const id = "row-" + val + "-checkbox";
            const dataTable = $("#" + getTableId(props)).DataTable();
            let display = (dataTable.page.info() ? dataTable.page.info().start : 0) + meta.row + 1;
            if (!hasCheckBoxes) {
              return display;
            }

            const params = Object.assign({}, attributes.parameters, {_selectedRows_: val});
            const url = be5.url.create(['form', attributes.category, attributes.page, 'Edit'], params);
            if (editOperation !== undefined) {
              display = '<a href="#!' + url + '" data-val="' + val + '" class="edit-operation-btn">' + display + '</a>';
            }

            return ('<input id="{id}" type="checkbox" class="rowCheckbox"/> ' +
              '<label for="{id}" class="rowIndex">{val}</label>')
              .replace('{id}', id)
              .replace('{id}', id)
              .replace('{val}', display);
          },
          targets: 0
        }, {
          render: (data, type, row) => {
            if (type === 'display') {
              const container = $('<div/>').html(jQueryFormatCell(data));
              //be5.ui.convertLinks(container);
              return container.html();
            }
            return data;
          },
          targets: "_all"
        }
      ],
      createdRow(row, data, index) { // see http://datatables.net/examples/advanced_init/row_callback.html
        const rowId = data[0];
        $(row).addClass("table-row-" + rowId);
        $(row).attr("data-table-row", rowId);
        $('input', row).change(function () {
          const checked = this.checked;

          if (checked) {// && $.inArray(rowId, selectedRows) === -1
            const newRows = Array.from(props.getSelectedRows());
            newRows.push(rowId);
            props.setSelectedRows(newRows);
            // if(attributes.rows.length === be5.tableState.selectedRows.length){
            //   $('#rowCheckboxAll').prop('checked', true);
            // }
          } else {//if (!checked && $.inArray(rowId, selectedRows) !== -1) {
            const newRows = Array.from(props.getSelectedRows());
            newRows.splice($.inArray(rowId, newRows), 1);
            props.setSelectedRows(newRows);
            //$('#rowCheckboxAll').prop('checked', false);
          }
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
    //   if ( $(_this.refs.main).find('.paging_simple_numbers span .paginate_button')
    //     && $(_this.refs.main).find('.paging_simple_numbers span .paginate_button').length > 1) {
    //     $(_this.refs.main).find('.dataTables_length').show();
    //     $(_this.refs.main).find('.paging_simple_numbers').show()
    //   } else {
    //     $(_this.refs.main).find('.dataTables_length').hide();
    //     $(_this.refs.main).find('.paging_simple_numbers').hide()
    //   }
    // };

    let drawGrouping;

    if (groupingColumn !== null) {
      const resultGroupingColumn = groupingColumn + 1;
      tableConfiguration.columnDefs.push({visible: false, targets: resultGroupingColumn});
      drawGrouping = (api) => {
        const rows = api.rows({page: 'current'}).nodes();
        let last = null;

        api.column(resultGroupingColumn, {page: 'current'}).data().each(function (group, i) {
          if (last !== group) {
            $(rows).eq(i).before('<tr class="table-group"><td colspan="' + nColumns + '">' + group + '</td></tr>');
            last = group;
          }
        });
      };
    }

    tableConfiguration.drawCallback = (settings) => {
      if (this.refs && this.refs.main) {
        const dataTable = $("#" + getTableId(props)).DataTable();
        if (groupingColumn !== null) drawGrouping(dataTable);
      }
      //hideControls();
    };
    return tableConfiguration;
  }

  getColumns(props) {
    const columns = [{"title": "#", "orderable": false, className: "default_order"}];
    props.value.data.attributes.columns.forEach((column) => {
      columns.push({"title": column.title, "orderable": !column.nosort });
    });
    return columns;
  }

  getData(props) {
    return props.value.data.attributes.rows.map((row) => {
      const finalRow = [row.id];
      row.cells.forEach((cell) => {
        finalRow.push(jQueryFormatCell(cell.content, cell.options))
      });
      return finalRow;
    });
  }

  static getEditOperation(props) {
    return props.operations === undefined ? undefined :
      props.operations.attributes.find(operation => operation.name === 'Edit');
  }

  render() {
    return (
      <div className="row data-table-wrapper" ref="main"/>
    )
  }
}

class DataTablesTableBox extends Component {
  render() {
    const attr = this.props.value.data.attributes;

    if (!hasRows(attr)) {
      if (attr.totalNumberOfRows > 0) {
        const previousPage = attr.offset / attr.length;
        const currentPage = previousPage + 1;
        return <div>
          <p>{be5.messages.table.noRecordsOnThePage.replace('{0}', currentPage + '')}</p>
          <TablePagination {...this.props}/>
        </div>;
      }
      let whenEmpty = be5.messages.table.emptyTable;
      if( attr.messageWhenEmpty && attr.messageWhenEmpty != '' )
        whenEmpty = attr.messageWhenEmpty;
      return (
        <div>
          {whenEmpty}
        </div>
      );
    }

    return (
        <div className="table-wrap">
        <QuickColumns
          columns={attr.columns}
          category={attr.category}
          page={attr.page}
          selectable={attr.selectable}
          meta={this.props.value.meta}
          layout={attr.layout}
        />
        <DataTablesWrapper {...this.props}/>
      </div>
    );
  }

}

function hasRows(attr) {
  return attr.rows.length > 0;
}

function getTableId(props) {
  return 'dataTables' + props.value.meta._ts_;
}

registerTableBox('dataTable', DataTablesTableBox);

export default DataTablesTableBox;
