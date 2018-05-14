import be5              from '../be5';
import bus              from '../core/bus';
import Preconditions    from '../utils/preconditions';
import changeDocument   from '../core/changeDocument';
import {updateUserInfo} from "../store/actions/user.actions";
import {UPDATE_USER_INFO} from "../store/constants/user.constants";
import {
  CLOSE_MAIN_MODAL,
  GO_BACK, OPEN_DEFAULT_ROUTE, OPEN_NEW_WINDOW, REDIRECT, UPDATE_DOCUMENT,
  UPDATE_PARENT_DOCUMENT
} from "../constants";
import {getDefaultRoute} from "../store/selectors/user.selectors";
import FrontendAction from "./model/FrontendAction";


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

          if (!this.isActions(attributes) && frontendParams.parentDocumentName !== undefined
                                          && frontendParams.parentDocumentName !== frontendParams.documentName)
          {
            //console.log("bus.fire() " + frontendParams.parentDocumentName + be5.documentRefreshSuffix);
            bus.fire(frontendParams.parentDocumentName + be5.DOCUMENT_REFRESH_SUFFIX)
          }

          switch (attributes.status) {
            case 'redirect':
              bus.fire("alert", {msg: attributes.message || be5.messages.successfullyCompleted, type: 'success'});

              this.executeActions(new FrontendAction(REDIRECT, attributes.details), json, frontendParams, applyParams);

              return;
            case 'finished':
              if(attributes.details !== undefined)
              {
                this.executeActions(attributes.details, json, frontendParams, applyParams);

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

  executeActions: function (actionsArrayOrOneObject, json, frontendParams, applyParams)
  {
    const documentName = frontendParams.documentName;

    const actions = this.getActionsMap(actionsArrayOrOneObject);

    if((actions.length === 0 && documentName === be5.MAIN_MODAL_DOCUMENT)
        || actions.hasOwnProperty(CLOSE_MAIN_MODAL))
    {
      bus.fire("mainModalClose");
    }

    if(actions[UPDATE_USER_INFO] !== undefined)
    {
      be5.store.dispatch(updateUserInfo(actions[UPDATE_USER_INFO]));
    }

    if(actions[REDIRECT] !== undefined)
    {
      const url = actions[REDIRECT];

      if(url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://"))
      {
        window.location.href = url;
      }
      else
      {
        if (documentName === be5.MAIN_DOCUMENT)
        {
          be5.url.set(url);
        }
        else
        {
          if(be5.url.parse(url).positional[0] === 'form')
          {
            this.load(this.getOperationParams(url, {}), frontendParams);
          }
          else
          {
            be5.url.process(documentName, '#!' + url);
          }
        }
      }
    }

    //window.open blocked by browser usually
    if(actions[OPEN_NEW_WINDOW] !== undefined)
    {
      window.open(actions[OPEN_NEW_WINDOW]);
    }

    if(actions.hasOwnProperty(OPEN_DEFAULT_ROUTE))
    {
      be5.url.set(getDefaultRoute(be5.getStoreState()));
    }

    if(actions.hasOwnProperty(GO_BACK))
    {
      window.history.back();
    }

    if(actions[UPDATE_PARENT_DOCUMENT] !== undefined)
    {
      const tableJson = Object.assign({}, actions[UPDATE_PARENT_DOCUMENT], {meta: json.meta});
      changeDocument(frontendParams.parentDocumentName, {value: tableJson});

      //usually used in filters
      if(documentName === be5.MAIN_MODAL_DOCUMENT)
      {
        bus.fire("mainModalClose");
      }
    }

    if(actions[UPDATE_DOCUMENT] !== undefined)
    {
      const tableJson = Object.assign({}, actions[UPDATE_DOCUMENT], {meta: json.meta});
      changeDocument(documentName, {value: tableJson});
    }

    bus.fire("executeFrontendActions", {actions, json, frontendParams, applyParams});
  },

  getActionsMap(actionsArrayOrOneObject) {
    let map = {};
    if(Array.isArray(actionsArrayOrOneObject))
    {
      for (let i = 0; i < actionsArrayOrOneObject.length; i++) {
        Preconditions.passed(typeof actionsArrayOrOneObject[i].type === "string",
          "Actions must be object with string type:" + actionsArrayOrOneObject);

        map[actionsArrayOrOneObject[i].type] = actionsArrayOrOneObject[i].value;
      }
    }
    else
    {
      Preconditions.passed(typeof actionsArrayOrOneObject.type === "string",
        "Actions must be object with string type:" + actionsArrayOrOneObject);

      map[actionsArrayOrOneObject.type] = actionsArrayOrOneObject.value;
    }

    return map;
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
