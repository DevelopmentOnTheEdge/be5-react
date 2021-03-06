import be5 from '../be5';
import bus from '../core/bus';
import Preconditions from '../utils/preconditions';
import changeDocument from '../core/changeDocument';
import {
  CONTEXT_PARAMS,
  ENTITY_NAME_PARAM,
  GO_BACK,
  MAIN_DOCUMENT,
  MAIN_MODAL_DOCUMENT,
  OPERATION_NAME_PARAM,
  QUERY_NAME_PARAM,
  REDIRECT,
  REFRESH_PARENT_DOCUMENT,
  TIMESTAMP_PARAM
} from "../constants";
import FrontendAction from "./model/FrontendAction";
import {executeFrontendActions, getActionsMap} from "./frontendActions";
import 'formdata-polyfill';
import {_get, _post} from "./formsRequests";
import {showMenuEvent} from "../utils/documentUtils";


export const loadOperation = (params, frontendParams) => {
  _send('form', params, frontendParams);
};

export const submitOperation = (params, frontendParams) => {
  _send('form/apply', params, frontendParams);
};

const _send = (action, data, frontendParams) => {
  _post(action, data, json => {
    _performOperationResult(json, frontendParams, data);
  }, (json) => {
    _performOperationResult(json, frontendParams, data);
  })
};

export const openOperationByUrl = (url, frontendParams) => {
  _send('form', getOperationInfoFromUrl(url), frontendParams);
};

export const openOperationByUrlWithValues = (url, values, frontendParams) => {
  _send('form', getOperationInfoFromUrl(url, values), frontendParams);
};

export const fetchOperationByUrl = (url, callback, failure = be5.log.error) => {
  _post('form', getOperationInfoFromUrl(url), callback, failure);
};

export const loadForm = (data, frontendParams) => {
  _get(data, json => {
    _performOperationResult(json, frontendParams, data);
  }, (json) => {
    _performOperationResult(json, frontendParams, data);
  })
};

export const _performOperationResult = (json, frontendParams, data) => {
  const documentName = frontendParams.documentName;

  Preconditions.passed(documentName);
  if (json.data !== undefined) {
    switch (json.data.type) {
      case 'form':
        _performForm(json, frontendParams);
        return;
      case 'operationResult':
        const attributes = json.data.attributes;
        const result = attributes.operationResult;

        if (result.status === 'ERROR') {
          showMenuEvent(json.data, true);
          bus.fire("alert", {msg: result.message, type: 'error', timeout:result.timeout});
          return;
        }

        if (frontendParams.onSuccess) {
          frontendParams.onSuccess(json, data);
        }

        switch (result.status) {
          case 'REDIRECTED':
            executeFrontendActions(new FrontendAction(REDIRECT, result.details), frontendParams);
            return;
          case 'FINISHED':
            showMenuEvent(json.data, true);
            if (result.details === undefined) {
              if (documentName === MAIN_MODAL_DOCUMENT) {
                bus.fire("alert", {msg: result.message || be5.messages.successfullyCompleted, type: 'success', timeout:result.timeout});
                bus.fire("mainModalClose");
              } else {
                changeDocument(documentName, {value: json, frontendParams: frontendParams});
              }

              if (frontendParams.parentDocumentName !== undefined &&
                frontendParams.parentDocumentName !== frontendParams.documentName) {
                executeFrontendActions(new FrontendAction(REFRESH_PARENT_DOCUMENT), frontendParams);
              }
            } else {
              if (result.message !== undefined) {
                const actions = getActionsMap(result.details);
                if (documentName === MAIN_MODAL_DOCUMENT || actions.hasOwnProperty(GO_BACK)) {
                  bus.fire("alert", {msg: result.message, type: 'success', timeout:result.timeout});
                } else {
                  changeDocument(documentName, {value: json, frontendParams: frontendParams});
                }
              }
              executeFrontendActions(result.details, frontendParams);
            }
            return;
          default:
            showMenuEvent(json.data, true);
            bus.fire("alert", {
              msg: be5.messages.errorUnknownRoute.replace('$action', 'status = ' + result.status),
              type: 'error'
            });
        }
        return;
      default:
        showMenuEvent(json.data, true);
        bus.fire("alert", {
          msg: be5.messages.errorUnknownRoute.replace('$action', 'data.type = ' + json.data.attributes.type),
          type: 'error'
        });
    }
  } else {
    bus.fire('showMenu', {show: false})
    if (json.errors !== undefined) {
      const error = json.errors[0];
      bus.fire("alert", {msg: error.status + " " + error.title, type: 'error'});
    } else {
      bus.fire("alert", {msg: json, type: 'error'});
    }
    changeDocument(documentName, {value: json, frontendParams: frontendParams});
  }
};

const _performForm = (json, frontendParams) => {
  const documentName = frontendParams.documentName;
  let operationResult = json.data.attributes.operationResult;

  if (operationResult.status === 'ERROR') {
    showMenuEvent(json.data, true);
    bus.fire("alert", {msg: operationResult.message, type: 'error', operationResult: operationResult.timeout});
  }

  if (documentName === MAIN_MODAL_DOCUMENT) {
    bus.fire("mainModalOpen");
    changeDocument(MAIN_MODAL_DOCUMENT, {value: json, frontendParams: frontendParams});
  }
  else {
    if (documentName === MAIN_DOCUMENT) be5.ui.setTitle(json.data.attributes.title);
    changeDocument(documentName, {value: json, frontendParams: frontendParams});
  }
};

export const getOperationInfoFromUrl = (url, values = {}) => {
  const attr = be5.url.parse(url);
  const operationInfo = {
    [ENTITY_NAME_PARAM]: attr.positional[1],
    [QUERY_NAME_PARAM]: attr.positional[2],
    [OPERATION_NAME_PARAM]: attr.positional[3],
    [CONTEXT_PARAMS]: JSON.stringify(attr.named)
  };
  return getOperationInfo(operationInfo, values)
};

const _buildFormDateFromObject = (formData, data, parentKey) => {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    Object.keys(data).forEach(key => {
      _buildFormDateFromObject(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
    });
  } else {
    formData.append(parentKey, data === null ? '' : data);
  }
}

export const getOperationInfo = (operationInfo, values = {}) => {
  let formData = new FormData();
  for (let k in values) {
    const value = values[k];
    if (Array.isArray(value)) {
      if (value.length === 0) {
        formData.append(k, "");
      } else {
        value.forEach(function (e) {
          formData.append(k, e);
        });
      }
    } else if (value instanceof FileList) {
      if (value.length === 0) {
        formData.append(k, "");
      } else {
        for (let i = 0; i < value.length; i++) {
          formData.append(k, value[i]);
        }
      }
    } else {
      _buildFormDateFromObject(formData, value, k);
    }
  }
  formData.append(ENTITY_NAME_PARAM, operationInfo[ENTITY_NAME_PARAM]);
  formData.append(QUERY_NAME_PARAM, operationInfo[QUERY_NAME_PARAM]);
  formData.append(OPERATION_NAME_PARAM, operationInfo[OPERATION_NAME_PARAM]);
  formData.append(CONTEXT_PARAMS, operationInfo[CONTEXT_PARAMS]);
  formData.append(TIMESTAMP_PARAM, new Date().getTime());
  return formData;
};

export default {
  load: loadOperation,

  apply: submitOperation,

};
