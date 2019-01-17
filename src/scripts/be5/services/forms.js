import be5 from '../be5';
import bus from '../core/bus';
import Preconditions from '../utils/preconditions';
import changeDocument from '../core/changeDocument';
import {MAIN_DOCUMENT, MAIN_MODAL_DOCUMENT, REDIRECT, REFRESH_DOCUMENT, REFRESH_PARENT_DOCUMENT} from "../constants";
import FrontendAction from "./model/FrontendAction";
import {executeFrontendActions} from "./frontendActions";
import 'formdata-polyfill';


export const loadOperation = (params, frontendParams) => {
  _send('form', params, frontendParams);
};

export const submitOperation = (params, frontendParams) => {
  _send('form/apply', params, frontendParams);
};

const _send = (action, data, frontendParams) => {
  _request(action, data, json => {
    _performOperationResult(json, frontendParams, data);
  },(json)=> {
    _performOperationResult(json, frontendParams, data);
  })
};

export const openOperationByUrl = (url, frontendParams) => {
  _send('form', getOperationParamsFromUrl(url), frontendParams);
};

export const openOperationByUrlWithValues = (url, values, frontendParams) => {
  _send('form', getOperationParamsFromUrl(url, values), frontendParams);
};

export const fetchOperationByUrl = (url, callback, failure) => {
  _request('form', getOperationParamsFromUrl(url), callback, failure);
};

const _request = (action, data, callback, failure) => {
  $.ajax({
    url: be5.net.url(action),
    method: 'POST',
    data: data,
    cache: false,
    contentType: false,
    processData: false,
    success(data) {callback(data)},
    error(xhr, status, error) {
      const response = JSON.parse(xhr.responseText);
      failure(response);
    }
  });
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
  };
};

export const _performOperationResult = (json, frontendParams, data) => {
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
          frontendParams.onSuccess(json, data);
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
  } else {
    if (json.errors !== undefined) {
      const error = json.errors[0];
      bus.fire("alert", {msg: error.status + " "+ error.title, type: 'error'});
    } else {
      bus.fire("alert", {msg: json, type: 'error'});
    }
    changeDocument(documentName, {value: json, frontendParams: frontendParams});
  }
};

const _performForm = (json, frontendParams) =>
{
  const documentName = frontendParams.documentName;
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
    if(documentName === MAIN_DOCUMENT)be5.ui.setTitle(json.data.attributes.title);
    changeDocument(documentName, { value: json, frontendParams: frontendParams });
  }
};

export const getOperationParamsFromUrl = (url, values = {}) => {
  const attr = be5.url.parse(url);
  const formParams = {
    entity: attr.positional[1],
    query: attr.positional[2],
    operation: attr.positional[3],
    contextParams: attr.named
  };
  return getOperationParams(formParams, values)
};

export const getOperationParams = (formParams, values = {}) => {
  let formData = new FormData();
  for (let k in values) {
    const value = values[k];
    if (Array.isArray(value)) {
      value.forEach(function(e) {
        formData.append(k, e);
      });
    } else {
      formData.append(k, value);
    }
  }
  formData.append("operationParams", JSON.stringify(formParams));
  formData.append("_ts_", new Date().getTime());
  console.log(formData.get("operationParams"), formData.get("_ts_"), values);
  return formData;
};

export default
{
  load: loadOperation,

  apply: submitOperation,

};
