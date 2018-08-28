import be5              from '../be5';
import bus              from '../core/bus';
import Preconditions    from '../utils/preconditions';
import changeDocument   from '../core/changeDocument';
import {REDIRECT} from "../constants";
import FrontendAction from "./model/FrontendAction";
import {executeFrontendActions} from "./frontendActions";


export const loadOperation = (params, frontendParams) => {
  _send('form', params, frontendParams);
};

export const submitOperation = (params, frontendParams) => {
  _send('form/apply', params, frontendParams);
};

const _send = (action, params, frontendParams) => {
  _request(action, params, data => {
    _performOperationResult(data, frontendParams, params);
  },(data)=> {
    bus.fire("alert", {msg: be5.messages.errorServerQueryException.replace('$message', data.value.code), type: 'error'});
  })
};

export const openOperationByUrl = (url, frontendParams) => {
  _send('form', getOperationParams(url), frontendParams);
};

export const openOperationByUrlWithValues = (url, values, frontendParams) => {
  _send('form', getOperationParams(url, values), frontendParams);
};

export const fetchOperationByUrl = (url, callback, failure) => {
  _request('form', getOperationParams(url), callback, failure);
};

const _request = (action, params, callback, failure) => {
  Preconditions.passed(params.entity);
  Preconditions.passed(params.query);
  Preconditions.passed(params.operation);

  const requestParams = {
    entity: params.entity,
    query: params.query,
    operation: params.operation,
    values: be5.net.paramString(params.values),
    operationParams: be5.net.paramString(params.operationParams),
    _ts_: new Date().getTime()
  };

  be5.net.request(action, requestParams, data => callback(data), data => failure(data));
};

export const _performOperationResult = (json, frontendParams, applyParams) => {
  const documentName = frontendParams.documentName;

  Preconditions.passed(documentName);

  if(json.data !== undefined)
  {
    switch (json.data.type) {
      case 'form':
        _performForm(json, frontendParams);
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

        if (!isActions(attributes) && frontendParams.parentDocumentName !== undefined
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
};

const isActions = (attributes) =>
{
  return attributes.status === 'finished' && attributes.details !== undefined
};

const _performForm = (json, frontendParams) =>
{
  if(frontendParams.documentName === be5.MAIN_DOCUMENT)be5.ui.setTitle(json.data.attributes.title);
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
};

export const getOperationParams = (url, values = {}) => {
  const attr = be5.url.parse(url);

  return {
    entity: attr.positional[1],
    query: attr.positional[2],
    operation: attr.positional[3],
    values: values,
    operationParams: attr.named
  };
};

export default
{
  load: loadOperation,

  apply: submitOperation,

};
