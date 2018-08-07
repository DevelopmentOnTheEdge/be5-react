import be5              from '../be5';
import bus              from '../core/bus';
import Preconditions    from '../utils/preconditions';
import changeDocument   from '../core/changeDocument';
import {REDIRECT} from "../constants";
import FrontendAction from "./model/FrontendAction";
import {executeFrontendActions} from "./frontendActions";


export default
{
  load(params, frontendParams) {
    this._send('form', params, frontendParams);
  },

  apply(params, frontendParams) {
    this._send('form/apply', params, frontendParams);
  },

  openOperationByUrl(url, callback, failure) {
    const {positional, named} = be5.url.parse(url);
    const params = {entity: positional[1], query: positional[2], operation: positional[3], operationParams: named};
    this._request('form', params, callback, failure);
  },

  _send(action, params, frontendParams) {
    this._request(action, params, data => {
      this._performOperationResult(data, frontendParams, params);
    },(data)=> {
      bus.fire("alert", {msg: be5.messages.errorServerQueryException.replace('$message', data.value.code), type: 'error'});
    })
  },

  _request(action, params, callback, failure) {
    Preconditions.passed(params.entity);
    Preconditions.passed(params.query);
    Preconditions.passed(params.operation);

    let selectedRows = params.selectedRows;
    if (!selectedRows) {
      selectedRows = (params.operationParams === undefined || params.operationParams.selectedRows === undefined)
        ? be5.tableState.selectedRows.join() : params.operationParams.selectedRows;
    }
    if (params.operationParams !== undefined && params.operationParams.selectedRows !== undefined) {
      delete params.operationParams.selectedRows;
    }

    const requestParams = {
      entity: params.entity,
      query: params.query,
      operation: params.operation,
      values: be5.net.paramString(params.values),
      operationParams: be5.net.paramString(params.operationParams),
      selectedRows: selectedRows || '',
      _ts_: new Date().getTime()
    };

    be5.net.request(action, requestParams, data => callback(data), data => failure(data));
  },

  _performOperationResult(json, frontendParams, applyParams)
  {
    const documentName = frontendParams.documentName;

    Preconditions.passed(documentName);

    if(json.data !== undefined)
    {
      switch (json.data.type) {
        case 'form':
          this._performForm(json, frontendParams);
          return;
        case 'operationResult':
          const attributes = json.data.attributes;

          if (attributes.status === 'error') {
            bus.fire("alert", {msg: attributes.message, type: 'error'});
            return;
          }

          if(frontendParams.onSuccess){
            frontendParams.onSuccess(json, applyParams);
          }

          if (!this.isActions(attributes) && frontendParams.parentDocumentName !== undefined
                                          && frontendParams.parentDocumentName !== frontendParams.documentName)
          {
            //console.log("bus.fire() " + frontendParams.parentDocumentName + be5.documentRefreshSuffix);
            bus.fire(frontendParams.parentDocumentName + be5.DOCUMENT_REFRESH_SUFFIX)
          }

          switch (attributes.status) {
            case 'redirect':
              bus.fire("alert", {msg: attributes.message || be5.messages.successfullyCompleted, type: 'success'});

              executeFrontendActions(new FrontendAction(REDIRECT, attributes.details), frontendParams);

              return;
            case 'finished':
              if(attributes.details !== undefined)
              {
                executeFrontendActions(attributes.details, frontendParams);

                if(attributes.message !== undefined)
                {
                  bus.fire("alert", {msg: attributes.message, type: 'success'});
                }
              }
              else
              {
                if(documentName === be5.MAIN_MODAL_DOCUMENT)
                {
                  bus.fire("mainModalClose");
                  bus.fire("alert", {msg: attributes.message || be5.messages.successfullyCompleted, type: 'success'});
                }
                else
                {
                  changeDocument(documentName, { value: json, frontendParams: frontendParams});
                }
              }
              return;
            default:
              bus.fire("alert", {
                msg: be5.messages.errorUnknownRoute.replace('$action', 'status = ' + attributes.status),
                type: 'error'
              });
            //changeDocument(documentName, {  value: be5.messages.errorUnknownRoute.replace('$action', 'status = ' + attributes.status) });
          }
          return;
        default:
          bus.fire("alert", {
            msg: be5.messages.errorUnknownRoute.replace('$action', 'data.type = ' + json.data.attributes.type),
            type: 'error'
          });
        //changeDocument(documentName, { value: be5.messages.errorUnknownRoute.replace('$action', 'data.type = ' + json.data.attributes.type) });
      }
    }else{
      const error = json.errors[0];
      bus.fire("alert", {msg: error.status + " "+ error.title, type: 'error'});

      changeDocument(documentName, {value: json, frontendParams: frontendParams});
    }
  },

  isActions(attributes)
  {
    return attributes.status === 'finished' && attributes.details !== undefined
  },

  _performForm(json, frontendParams)
  {
    let operationResult = json.data.attributes.operationResult;

    if(operationResult.status === 'error')
    {
      bus.fire("alert", {msg: operationResult.message, type: 'error'});
    }

    const formComponentName = json.data.attributes.layout.type;

    if(formComponentName === 'modalForm' || frontendParams.documentName === be5.MAIN_MODAL_DOCUMENT)
    {
      bus.fire("mainModalOpen");

      changeDocument(be5.MAIN_MODAL_DOCUMENT, { value: json, frontendParams: frontendParams });
    }
    else
    {
      changeDocument(frontendParams.documentName, { value: json, frontendParams: frontendParams });
    }
  },

  changeLocationHash(props)
  {
    let self;
    if(props.value.data !== undefined){
      self = props.value.data.links.self;
    }else{
      self = props.value.errors[0].links.self;
    }

    if(props.frontendParams && props.frontendParams.documentName === be5.MAIN_DOCUMENT
                            && be5.url.get() !== '#!' + self)
    {

      be5.url.set(self)
    }
  },

  getOperationParams(url, values = {})
  {
    const attr = be5.url.parse(url);

    return {
      entity: attr.positional[1],
      query: attr.positional[2],
      operation: attr.positional[3],
      values: values,
      operationParams: attr.named
    };
  }

};
