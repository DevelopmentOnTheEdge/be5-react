import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import be5 from '../../be5';
import {getModelByID, getResourceByType, getSelfUrl} from '../../utils/documentUtils';
import {loadForm} from '../../services/forms';
import OperationBox from './OperationBox';
import Document from "../../containers/Document";
import DataTablesTableBox from "./tableBoxes/DataTablesTableBox";
import ListTableBox from "./tableBoxes/ListTableBox";
import {registerDocument} from '../../core/documents';
import CategoryNavigation from "./CategoryNavigation";
import {executeFrontendActions, getBackOrOpenDefaultRouteAction} from "../../services/frontendActions";
import FilterUI from "./FilterUI";
import {
  CONTEXT_PARAMS,
  ENTITY_NAME_PARAM,
  MAIN_DOCUMENT,
  OPERATION_NAME_PARAM,
  QUERY_NAME_PARAM,
  SELECTED_ROWS
} from "../../constants";
import {makeSafeForClassName} from "../../utils/utils";


class Table extends Component
{
  constructor(props) {
    super(props);

    this.state = {runReload: ""};
    this.onOperationClick = this.onOperationClick.bind(this);
    this._refreshEnablementIfNeeded = this._refreshEnablementIfNeeded.bind(this);
  }

  onOperationClick(operation, selectedRow) {
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

    let contextParams;
    if (be5.tableState.selectedRows.length > 0 || selectedRow) {
      contextParams = Object.assign({}, attr.parameters);
      contextParams[SELECTED_ROWS] = selectedRow || be5.tableState.selectedRows.join();
    } else {
      contextParams = attr.parameters;
    }

    const operationInfo = {
      [ENTITY_NAME_PARAM]: attr.category,
      [QUERY_NAME_PARAM]: attr.page || 'All records',
      [OPERATION_NAME_PARAM]: name,
      [CONTEXT_PARAMS]: JSON.stringify(contextParams)
    };
    loadForm(operationInfo, frontendParams);
  }

  render() {
    const value = this.props.value;
    const {data, included} = this.props.value;
    if(this.props.frontendParams.documentName === MAIN_DOCUMENT)be5.ui.setTitle(data.attributes.title + ' ' + this.getOperationParamsInfo());
    const hasRows = data.attributes.rows.length !== 0;
    const operations = getResourceByType(included, "documentOperations");

    let table = this.getTableBox(value, data, table, operations);

    const TitleTag = `h${(value.data.attributes.parameters && value.data.attributes.parameters._titleLevel_) || 1}`;

    const topFormJson = value.included !== undefined ? getModelByID(value.included, value.meta, "topForm") : undefined;
    let topForm;
    let hideOperations = data.attributes.layout.hideOperations || [];
    if(topFormJson){
      hideOperations.push(topFormJson.data.attributes.operation);
      const layout = topFormJson.data.attributes.layout;
      if (layout.type === undefined) layout.type = 'inlineMiniForm';
      if (layout.bsSize === undefined) layout.bsSize = 'sm';
      topForm = <Document
        frontendParams={{documentName: "documentTopForm", parentDocumentName: this.props.frontendParams.documentName}}
        value={topFormJson}
      />
    }

    return (
      <div className={classNames("table-component", this.getTableClass(), data.attributes.layout.classes)}>
        {topForm}
        <TitleTag className="table-component__title">
          {value.data.attributes.title}
          {this.getOperationParamsInfo().length > 0 ? <small>{' '}{this.getOperationParamsInfo()}</small> : null}
        </TitleTag>
        <CategoryNavigation
          data={getResourceByType(included, "documentCategories")}
          url={getSelfUrl(this.props.value)}
        />
        <OperationBox
          ref="operations"
          operations={operations}
          onOperationClick={this.onOperationClick}
          hasRows={hasRows}
          hideOperations={hideOperations}
        />
        <FilterUI
          entity={data.attributes.category}
          query={data.attributes.page}
          params={data.attributes.parameters}
          frontendParams={this.props.frontendParams}
        />
        {table}
        {this._createTableCancelAction()}
      </div>
    );
  }

  getTableBox(value, data, operations) {
    const displayType = (value.data.attributes.parameters && value.data.attributes.parameters._displayType_)
      || data.attributes.layout._displayType_;
    if (displayType === 'list') {
      return (
        <ListTableBox ref="tableBox" value={value}/>
      )
    }
    else {
      return (
        <DataTablesTableBox
          _refreshEnablementIfNeeded={this._refreshEnablementIfNeeded}
          ref="tableBox"
          value={value}
          operations={operations}
          onOperationClick={this.onOperationClick}
          frontendParams={this.props.frontendParams}
        />
      );
    }
  }

  getTableClass() {
    const attributes = this.props.value.data.attributes;
    const entity = makeSafeForClassName(attributes.category);
    const query = makeSafeForClassName(attributes.page);
    return entity + '_' + query;
  }

  getOperationParamsInfo() {
    const filterInfo = getResourceByType(this.props.value.included, "filterInfo");
    if (filterInfo && filterInfo.attributes.operationParamsInfo && filterInfo.attributes.operationParamsInfo.length > 0)
    {
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
        this.props.frontendParams.documentName === MAIN_DOCUMENT)
    {
      const action = layout.cancelAction || getBackOrOpenDefaultRouteAction();
      return (
        <button
          type="button"
          className="btn btn-light mt-2"
          onClick={() => executeFrontendActions(action, this.props.frontendParams)}
        >
          {layout.cancelActionText || be5.messages.back}
        </button>
      );
    }else{
      return null;
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
