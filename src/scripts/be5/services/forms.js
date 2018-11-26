import be5 from '../be5';
import bus from '../core/bus';
import Preconditions from '../utils/preconditions';
import changeDocument from '../core/changeDocument';
import {MAIN_DOCUMENT, MAIN_MODAL_DOCUMENT, REDIRECT, REFRESH_DOCUMENT, REFRESH_PARENT_DOCUMENT} from "../constants";
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
  be5.net.request(action, getFormRequestParams(params), data => callback(data), data => failure(data));
};

export const getFormRequestParams = (params) => {
  Preconditions.passed(params.entity);
  Preconditions.passed(params.query);
  Preconditions.passed(params.operation);

  return {
    entity: params.entity,
    query: params.query,
    operation: params.operation,
    values: be5.net.paramString(params.values),
    operationParams: be5.net.paramString(params.operationParams),
    _ts_: new Date().getTime()
  };
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
        const result = attributes.operationResult;

        if (result.status === 'error') {
          bus.fire("alert", {msg: result.message, type: 'error'});
          return;
        }

        if(frontendParams.onSuccess){
          frontendParams.onSuccess(json, applyParams);
        }

        switch (result.status) {
          case 'redirect':
            bus.fire("alert", {msg: result.message || be5.messages.successfullyCompleted, type: 'success'});
            executeFrontendActions(new FrontendAction(REDIRECT, result.details), frontendParams);
            return;
          case 'finished':
            const formComponentName = attributes.layout && attributes.layout.type;
            if(formComponentName === 'modalForm' || documentName === MAIN_MODAL_DOCUMENT
                || (result.message === undefined && result.details !== undefined))
            {
              bus.fire("mainModalClose");
              bus.fire("alert", {msg: result.message || be5.messages.successfullyCompleted, type: 'success'});
            }
            else
            {
              changeDocument(documentName, {value: json, frontendParams: frontendParams});
            }

            if(result.details !== undefined)
            {
              executeFrontendActions(result.details, frontendParams);
            }
            else
            {
              if (frontendParams.parentDocumentName !== undefined)
              {
                //for TableForm
                executeFrontendActions(new FrontendAction(REFRESH_PARENT_DOCUMENT), frontendParams);
              }
              else
              {
                if (formComponentName === 'modalForm' || documentName === MAIN_MODAL_DOCUMENT)
                {
                  executeFrontendActions(new FrontendAction(REFRESH_DOCUMENT, MAIN_DOCUMENT), frontendParams);
                }
              }
            }
            return;
          default:
            bus.fire("alert", {
              msg: be5.messages.errorUnknownRoute.replace('$action', 'status = ' + result.status),
              type: 'error'
            });
        }
        return;
      default:
        bus.fire("alert", {
          msg: be5.messages.errorUnknownRoute.replace('$action', 'data.type = ' + json.data.attributes.type),
          type: 'error'
        });
    }
  }else{
    const error = json.errors[0];
    bus.fire("alert", {msg: error.status + " "+ error.title, type: 'error'});

    changeDocument(documentName, {value: json, frontendParams: frontendParams});
  }
};

const _performForm = (json, frontendParams) =>
{
  const documentName = frontendParams.documentName;
  if(documentName === MAIN_DOCUMENT)be5.ui.setTitle(json.data.attributes.title);
  let operationResult = json.data.attributes.operationResult;

  if(operationResult.status === 'error')
  {
    bus.fire("alert", {msg: operationResult.message, type: 'error'});
  }

  const formComponentName = json.data.attributes.layout.type;

  if(formComponentName === 'modalForm' || documentName === MAIN_MODAL_DOCUMENT)
  {
    bus.fire("mainModalOpen");
    changeDocument(MAIN_MODAL_DOCUMENT, { value: json, frontendParams: frontendParams });
  }
  else
  {
    changeDocument(documentName, { value: json, frontendParams: frontendParams });
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
