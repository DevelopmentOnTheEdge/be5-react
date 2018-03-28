import be5              from '../be5';
import bus              from '../core/bus';
import Preconditions    from '../utils/preconditions';
import changeDocument   from '../core/changeDocument';
import {updateUserInfo} from "../store/actions/user.actions";
import {UPDATE_USER_INFO} from "../store/constants/user.constants";


export default
{
  load(params, frontendParams) {
    this._send('form', params, frontendParams);
  },

  apply(params, frontendParams) {
    this._send('form/apply', params, frontendParams);
  },

  _send(action, params, frontendParams) {
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

    be5.net.request(action, requestParams, data => {
      this._performOperationResult(data, frontendParams, params);
    },(data)=> {
      bus.fire("alert", {msg: be5.messages.errorServerQueryException.replace('$message', data.value.code), type: 'error'});
    });
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

          if (attributes.status !== 'document' && frontendParams.parentDocumentName !== undefined
                                            && frontendParams.parentDocumentName !== frontendParams.documentName)
          {
            //console.log("bus.fire() " + frontendParams.parentDocumentName + be5.documentRefreshSuffix);
            bus.fire(frontendParams.parentDocumentName + be5.DOCUMENT_REFRESH_SUFFIX)
          }

          switch (attributes.status) {
            case 'redirect':
              bus.fire("alert", {msg: be5.messages.successfullyCompleted, type: 'success'});
              if(attributes.details.startsWith("http://")
                      || attributes.details.startsWith("https://")
                      || attributes.details.startsWith("ftp://"))
              {
                window.location.href = attributes.details;
              }
              else
              {
                if (documentName === be5.MAIN_DOCUMENT)
                {
                  be5.url.set(attributes.details);
                }
                else
                {
                  if(be5.url.parse(attributes.details).positional[0] === 'form')
                  {
                    this.load(this.getOperationParams(attributes.details, {}), frontendParams);
                  }
                  else
                  {
                    be5.url.process(documentName, '#!' + attributes.details);
                  }
                }
              }
              return;
            case 'finished':
              if(attributes.details !== undefined)
              {
                if(attributes.details === UPDATE_USER_INFO)
                {
                  be5.store.dispatch(updateUserInfo());

                  bus.fire('CallDefaultAction');

                  if(documentName === be5.MAIN_MODAL_DOCUMENT)bus.fire("mainModalClose");
                }
              }
              else if(documentName === be5.MAIN_MODAL_DOCUMENT)
              {
                bus.fire("alert", {msg: json.data.attributes.message || be5.messages.successfullyCompleted, type: 'success'});
                bus.fire("mainModalClose");
              }
              else
              {
                changeDocument(documentName, { value: json, frontendParams: frontendParams});
              }
              return;
            case 'document':
              const tableJson = Object.assign({}, attributes.details, {meta: json.meta});
              changeDocument(frontendParams.parentDocumentName, {value: tableJson});
              if(documentName === be5.MAIN_MODAL_DOCUMENT) {
                bus.fire("mainModalClose");
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
