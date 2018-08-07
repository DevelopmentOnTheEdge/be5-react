import be5              from '../be5';
import bus              from '../core/bus';
import Preconditions    from '../utils/preconditions';
import changeDocument   from '../core/changeDocument';
import {updateUserInfo} from "../store/actions/user.actions";
import {getDefaultRoute} from "../store/selectors/user.selectors";
import {UPDATE_USER_INFO} from "../store/constants/user.constants";
import {
  CLOSE_MAIN_MODAL,
  GO_BACK, OPEN_DEFAULT_ROUTE, OPEN_NEW_WINDOW, REDIRECT, UPDATE_DOCUMENT,
  UPDATE_PARENT_DOCUMENT
} from "../constants";
import {openOperationByUrl} from './forms';


export const executeFrontendActions = (actionsArrayOrOneObject, frontendParams) =>
{
  const documentName = frontendParams.documentName;

  const actions = getActionsMap(actionsArrayOrOneObject);

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
          openOperationByUrl(url, frontendParams);
        }
        else
        {
          be5.url.process(documentName, '#!' + url);
        }
      }
    }
  }

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
    const tableJson = Object.assign({}, actions[UPDATE_PARENT_DOCUMENT], {meta: {_ts_: new Date().getTime()}});
    changeDocument(frontendParams.parentDocumentName, {value: tableJson});

    //usually used in filters
    if(documentName === be5.MAIN_MODAL_DOCUMENT)
    {
      bus.fire("mainModalClose");
    }
  }

  if(actions[UPDATE_DOCUMENT] !== undefined)
  {
    const tableJson = Object.assign({}, actions[UPDATE_DOCUMENT], {meta: {_ts_: new Date().getTime()}});
    changeDocument(documentName, {value: tableJson});
  }

  bus.fire("executeFrontendActions", {actions, frontendParams});
};

export const getActionsMap = (actionsArrayOrOneObject) => {
  let map = {};
  if(Array.isArray(actionsArrayOrOneObject))
  {
    for (let i = 0; i < actionsArrayOrOneObject.length; i++) {
      Preconditions.passed(typeof actionsArrayOrOneObject[i].type === "string",
        "Actions must be object with string 'type' field: " + actionsArrayOrOneObject);

      map[actionsArrayOrOneObject[i].type] = actionsArrayOrOneObject[i].value;
    }
  }
  else
  {
    Preconditions.passed(typeof actionsArrayOrOneObject.type === "string",
      "Actions must be object with string 'type' field: " + actionsArrayOrOneObject);

    map[actionsArrayOrOneObject.type] = actionsArrayOrOneObject.value;
  }

  return map;
};
