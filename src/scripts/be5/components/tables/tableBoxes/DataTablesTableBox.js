import React, {Component} from 'react';
import be5 from '../../../be5';
import {processHashUrls} from '../../../utils/documentUtils';
import QuickColumns from '../QuickColumns';
import {jQueryFormatCell, loadTableByUrl, updateTable} from "../../../services/tables";
import {CONTEXT_PARAMS, ENTITY_NAME_PARAM, QUERY_NAME_PARAM} from "../../../constants";
import {registerTableBox} from "../../../core/registers/tableBoxes";

/**
 * https://datatables.net/
 */
class DataTablesTableBox extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.applyTable(this.props, this.refs.main);
    this.props._refreshEnablementIfNeeded();
  }

  shouldComponentUpdate(nextProps) {
    $(this.refs.main)
      .find('table')
      .DataTable()
      .destroy(true);
    $(this.refs.main).empty();
    this.applyTable(nextProps, this.refs.main);

    this.props._refreshEnablementIfNeeded();
    return false
  }

  componentWillUnmount() {
    $(this.refs.main)
      .find('table')
      .DataTable()
      .destroy(true)
  }

  onSelectionChange() {
    this.props._refreshEnablementIfNeeded();

    if (this.props.hasOwnProperty('callbacks') && this.props.callbacks !== undefined
      && this.props.callbacks.hasOwnProperty('onSelectionChange'))
    {
      this.props.callbacks.onSelectionChange(be5.tableState.selectedRows);
    }
  }

  getTableConfiguration(props) {
    const attributes = props.value.data.attributes;
    const _this = this;
    be5.tableState.selectedRows = [];
    const hasCheckBoxes = attributes.selectable;
    const editOperation = DataTablesTableBox.getEditOperation(props);

    const columns = this.getColumns(props);
    const data = this.getData(props);

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
      data: data,
      columns: columns,
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
        const params = {
          [ENTITY_NAME_PARAM]: attributes.category,
          [QUERY_NAME_PARAM]: attributes.page,
          [CONTEXT_PARAMS]: Object.assign({}, attributes.parameters, {
            _offset_: data.start,
            _limit_: data.length,
          })
        };
        if (data.order && data.order.length > 0) {
          params[CONTEXT_PARAMS]._orderColumn_ = data.order[0].column;
          params[CONTEXT_PARAMS]._orderDir_ = data.order[0].dir;
        }
        updateTable(params, function (jsonApiModel) {
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
            const dataTable = $(this.refs.main).find('table').dataTable();
            let display = (dataTable.api().page.info() ? dataTable.api().page.info().start : 0) + meta.row + 1;
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
        const dataTable = $(this.refs.main).find('table').dataTable();
        if (groupingColumn !== null) drawGrouping(dataTable.api());
      }
      //hideControls();
    };
    return tableConfiguration;
  }

  applyTable(props, node) {
    const attributes = props.value.data.attributes;
    if (attributes.columns.length === 0) return;

    const tableTag = $('<table id="' + props.value.meta._ts_ + '" '
      + 'class="table table-striped table-striped-light table-bordered display table-sm" cellspacing="0"/>');
    tableTag.appendTo(node);

    tableTag.dataTable(this.getTableConfiguration(props));

    $('.dataTables_length select').removeClass('form-control-sm');

    tableTag.on("click", '.edit-operation-btn', function (e) {
      e.preventDefault();
      props.onOperationClick(DataTablesTableBox.getEditOperation(props), $(this).data("val"));
    });

    processHashUrls(tableTag, props.frontendParams.documentName);

    tableTag.on( 'draw.dt', function () {
      be5.tableState.selectedRows = [];
      props._refreshEnablementIfNeeded();
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

    this.refs.quickColumns.setTable(this.refs.main);

    this.onSelectionChange();
  }

  getColumns(props) {
    const columns = [{"title": "#"}];
    props.value.data.attributes.columns.forEach((column) => {
      columns.push({"title": column.title});
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
    const {attributes: a} = this.props.value.data;

    if (a.rows.length === 0) {
      const currentPage = a.offset/a.length + 1;
      if (a.totalNumberOfRows > 0) {
        return (
          <div>
            <p>{be5.messages.table.noRecordsOnThePage.replace('{0}', currentPage)}</p>
            <ul className="pagination">
              <li className="paginate_button page-item">
                <a
                  href="#"
                  className="page-link"
                  onClick={(e) => {
                    e.preventDefault();
                    loadTableByUrl("table/equipments/All records/_offset_=" + (a.offset - a.length), this.props.frontendParams);
                  }}
                >{be5.messages.table.previousPage}</a>
              </li>
              <li className="paginate_button page-item">
                <a
                  href="#"
                  className="page-link"
                  onClick={(e) => {
                    e.preventDefault();
                    loadTableByUrl("table/equipments/All records/_offset_=0", this.props.frontendParams);
                  }}
                >1</a>
              </li>
              <li className="paginate_button page-item disabled">
                <a href="#" className="page-link">{be5.messages.table.nextPage}</a>
              </li>
            </ul>
          </div>
        );
      }
      return (
        <div>
          {be5.messages.table.emptyTable}
        </div>
      );
    }

    return (
      <div className="table-wrap">
        <QuickColumns
          ref="quickColumns"
          columns={a.columns}
          category={a.category}
          page={a.page}
          table={this.refs.main}
          selectable={a.selectable}
        />
        <div className="row data-table-wrapper" ref="main"/>
      </div>
    );
  }

}

registerTableBox('dataTable', DataTablesTableBox);

export default DataTablesTableBox;
