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
import {MAIN_DOCUMENT, MAIN_MODAL_DOCUMENT, SELECTED_ROWS} from "../../constants";
import {getBackAction, makeSafeForClassName} from "../../utils/utils";
import {getTableBox} from "../../core/registers/tableBoxes";
import {setTableFilter} from "../../services/tableStates";
import {getContextParams} from "../../utils/filterUtils";


class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {runReload: "", selectedRows: []};
    this.onOperationClick = this.onOperationClick.bind(this);
    this.setSelectedRows = this.setSelectedRows.bind(this);
  }

  componentDidMount() {
    Table.storeDocumentState(this.props)
  }

  componentDidUpdate() {
    Table.storeDocumentState(this.props)
  }

  static storeDocumentState(props) {
    const attr = props.value.data.attributes;
    setTableFilter(attr.category, attr.page, attr.parameters);
  }

  componentWillReceiveProps() {
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

    let contextParams = getContextParams(attr.parameters);
    if (this.state.selectedRows.length > 0 || selectedRow) {
      contextParams[SELECTED_ROWS] = selectedRow || this.state.selectedRows.join();
    }

    const url = be5.url.form(['form', attr.category, attr.page || 'All records', name], contextParams);
    be5.url.open(frontendParams, "#!" + url);
  }

  render() {
    const value = this.props.value;
    const {data, included} = this.props.value;
    if (this.props.frontendParams.documentName === MAIN_DOCUMENT) {
      be5.ui.setTitle(data.attributes.title + ' ' + this.getOperationParamsInfo());
    }
    const hasRows = data.attributes.rows.length > 0;
    const operations = getResourceByType(included, "documentOperations");

    const TitleTag = `h${(value.data.attributes.parameters && value.data.attributes.parameters._titleLevel_) || 1}`;

    const topFormJson = value.included !== undefined ? getModelByID(value.included, value.meta, "topForm") : undefined;
    let hideOperations = data.attributes.layout.hideOperations || [];
    if (topFormJson) hideOperations.push(topFormJson.data.attributes.operation);

    return (
      <div className={classNames("table-component", this.getTableClass(), data.attributes.layout.classes)}>
        {this.topForm(topFormJson)}
        <TitleTag className="table-component__title">
          {value.data.attributes.title}
          {this.getOperationParamsInfo().length > 0 ? <small>{' '}{this.getOperationParamsInfo()}</small> : null}
        </TitleTag>
        <CategoryNavigation
          data={getResourceByType(included, "documentCategories")}
          url={getSelfUrl(this.props.value)}
        />
        <OperationBox
          operations={operations}
          onOperationClick={this.onOperationClick}
          selectedRows={this.state.selectedRows}
          hasRows={hasRows}
          hideOperations={hideOperations}
        />
        <FilterUI
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

  tableBox(value, data, operations) {
    const displayType = (value.data.attributes.parameters && value.data.attributes.parameters._displayType_)
      || data.attributes.layout._displayType_ || 'dataTable';

    const TableBox = getTableBox(displayType);
    if (TableBox === undefined) {
      return (
        <div>{be5.messages.tableBoxForTypeNotRegistered.replace('$type', displayType)}</div>
      )
    }
    return (
      <TableBox
        value={value}
        operations={operations}
        selectedRows={this.state.selectedRows}
        setSelectedRows={this.setSelectedRows}
        onOperationClick={this.onOperationClick}
        frontendParams={this.props.frontendParams}
      />
    );
  }

  setSelectedRows(newRows) {
    this.setState({selectedRows: newRows})
  }

  getTableClass() {
    const attributes = this.props.value.data.attributes;
    const entity = makeSafeForClassName(attributes.category);
    const query = makeSafeForClassName(attributes.page);
    return entity + '_' + query;
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
      const layout = topFormJson.data.attributes.layout;
      if (layout.type === undefined) layout.type = 'inlineMiniForm';
      if (layout.bsSize === undefined) layout.bsSize = 'sm';
      const FormComponent = getDocument(layout.type);
      return <FormComponent
        frontendParams={{documentName: this.props.frontendParams.documentName}}
        value={topFormJson}
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
