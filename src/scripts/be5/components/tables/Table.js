import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import be5 from '../../be5';
import {getModelByID, getResourceByType, getSelfUrl} from '../../utils/documentUtils';
import OperationBox from './OperationBox';
import {getDocument, registerDocument} from '../../core/registers/documents';
import CategoryNavigation from "./CategoryNavigation";
import {executeFrontendActions} from "../../services/frontendActions";
import FilterUI from "./FilterUI";
import {DEFAULT_TABLE_BOX, MAIN_DOCUMENT, MAIN_MODAL_DOCUMENT, SELECTED_ROWS} from "../../constants";
import {getBackAction, makeSafeForClassName} from "../../utils/utils";
import {getTableBox} from "../../core/registers/tableBoxes";
import {setTableFilter} from "../../services/tables";
import Document from "../../containers/Document";
import QuickFiltersBox from "./QuickFiltersBox";


class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {runReload: "", selectedRows: []};
    this.onOperationClick = this.onOperationClick.bind(this);
    this.setSelectedRows = this.setSelectedRows.bind(this);
    this.getSelectedRows = this.getSelectedRows.bind(this);
  }

  componentDidMount() {
    Table.storeDocumentState(this.props)
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.value.meta._ts_ > this.props.value.meta._ts_) {
      Table.storeDocumentState(nextProps)
    }
    return true;
  }

  static storeDocumentState(props) {
    const attr = props.value.data.attributes;
    setTableFilter(attr.category, attr.page, attr.parameters);
  }

  UNSAFE_componentWillReceiveProps() {
    if (this.state.selectedRows.length > 0) this.setState({selectedRows: []});
  }

  onOperationClick(operation, selectedRow) {
    const frontendParams = {
      documentName: this.props.frontendParams.operationDocumentName || this.props.frontendParams.documentName,
      parentDocumentName: this.props.frontendParams.documentName
    };
    if (operation.layout && operation.layout.type === 'modalForm') {
      frontendParams.documentName = MAIN_MODAL_DOCUMENT;
    }

    if (operation.clientSide === true) {
      executeFrontendActions(JSON.parse(operation.action), frontendParams);
      return;
    }

    const name = operation.name;
    const attr = this.props.value.data.attributes;

    let contextParams;
    if (this.state.selectedRows.length > 0 || selectedRow) {
      contextParams = Object.assign({}, attr.parameters);
      contextParams[SELECTED_ROWS] = selectedRow || this.state.selectedRows.join();
    } else {
      contextParams = attr.parameters;
    }
    const url = be5.url.form(['form', attr.category, attr.page || 'All records', name], contextParams);
    be5.url.open(frontendParams, "#!" + url);
  }

  render() {
    const value = this.props.value;
    const {data, included, meta} = value;
    if (this.props.frontendParams.documentName === MAIN_DOCUMENT) {
      be5.ui.setTitle(data.attributes.title + ' ' + this.getOperationParamsInfo());
    }

    const topFormJson = getModelByID(included, meta, "topForm");
    const categories = getResourceByType(included, "documentCategories");
    const quickFilters = getResourceByType(included, "quickFilters");
    const operations = getResourceByType(included, "documentOperations");
    const filterInfo = getResourceByType(included, "filterInfo");

    return (
      <div className={classNames("table-component", this.getTableClass(), data.attributes.layout.classes)}>
        {this.topForm(topFormJson)}
        {this.getTitleTag(value)}
        <CategoryNavigation
          data={categories}
          url={getSelfUrl(this.props.value)}
        />
        <QuickFiltersBox
          data={quickFilters}
          url={getSelfUrl(this.props.value)}
        />
        <OperationBox
          operations={operations}
          onOperationClick={this.onOperationClick}
          selectedRows={this.state.selectedRows}
          hasRows={data.attributes.rows.length > 0}
          hideOperations={this.getHideOperations(data, topFormJson)}
        />
        <FilterUI
          data={filterInfo}
          entity={data.attributes.category}
          query={data.attributes.page}
          params={data.attributes.parameters}
          frontendParams={this.props.frontendParams}
        />
        {this.tableBox(value, data, operations)}
        {this._createTableCancelAction()}
      </div>
    );
  }

  getHideOperations(data, topFormJson) {
    let hideOperations = data.attributes.layout.hideOperations || [];
    if (topFormJson) hideOperations.push(topFormJson.data.attributes.operation);
    return hideOperations;
  }

  tableBox(value, data, operations) {
    const displayType = (value.data.attributes.parameters && value.data.attributes.parameters._displayType_)
      || data.attributes.layout.tableBox || data.attributes.layout._displayType_ || DEFAULT_TABLE_BOX;

    const TableBoxComponent = getTableBox(displayType);
    if (TableBoxComponent === undefined) {
      return (
        <div>{be5.messages.tableBoxForTypeNotRegistered.replace('$type', displayType)}</div>
      )
    }
    return (
      <TableBoxComponent
        value={value}
        operations={operations}
        selectedRows={this.state.selectedRows}
        setSelectedRows={this.setSelectedRows}
        getSelectedRows={this.getSelectedRows}
        onOperationClick={this.onOperationClick}
        frontendParams={this.props.frontendParams}
      />
    );
  }

  setSelectedRows(newRows) {
    this.setState({selectedRows: newRows})
  }

  getSelectedRows() {
    return this.state.selectedRows;
  }

  getTableClass() {
    const attributes = this.props.value.data.attributes;
    const entity = makeSafeForClassName(attributes.category);
    const query = makeSafeForClassName(attributes.page);
    return entity + '_' + query;
  }

  getTitleTag(value) {
    if (value.data.attributes.layout.hasOwnProperty('hideTitle') )
        return null;

    const TitleTag = `h${(value.data.attributes.parameters && value.data.attributes.parameters._titleLevel_) || 1}`;
    const operationParamsInfo = this.getOperationParamsInfo();
    return <TitleTag className="table-component__title">
      {value.data.attributes.title}
      {operationParamsInfo.length > 0 ? ' ' : null}
      {operationParamsInfo.length > 0 ?
        <small>{operationParamsInfo}</small>
      : null}
    </TitleTag>;
  }

  getOperationParamsInfo() {
    const filterInfo = getResourceByType(this.props.value.included, "filterInfo");
    if (filterInfo && filterInfo.attributes.operationParamsInfo && filterInfo.attributes.operationParamsInfo.length > 0) {
      const text = filterInfo.attributes.operationParamsInfo.map(r => r.key ? r.key + ': ' + r.value : r.value).join(', ');
      return be5.messages.table.tableFor + ' ' + text
    }
    return '';
  }

  /**
   * layout: '{"cancelActionText":"Back"}'
   * layout: '{"cancelAction": {"type": "SET_URL","value":"text/test123"}}'
   */
  _createTableCancelAction() {
    const layout = this.props.value.data.attributes.layout;

    if (layout.hasOwnProperty('cancelAction') || layout.cancelActionText ||
      this.props.frontendParams.documentName === MAIN_DOCUMENT) {
      const action = layout.cancelAction || getBackAction();
      if (action !== undefined) {
        return (
          <button
            type="button"
            className="btn btn-light mt-2 btn-back"
            onClick={() => executeFrontendActions(action, this.props.frontendParams)}
          >
            {layout.cancelActionText || be5.messages.back}
          </button>
        );
      }
    }
    return null;
  }

  topForm(topFormJson) {
    if (topFormJson) {
      return <Document
        frontendParams={{
          documentName: "topForm",
          parentDocumentName: this.props.frontendParams.documentName
        }}
        value={topFormJson}
        baseLayout={{type: 'inlineMiniForm', bsSize: 'sm'}}
      />
    }
    return null;
  }
}

Table.propTypes = {
  value: PropTypes.object.isRequired
};

registerDocument('table', Table);

export default Table;
