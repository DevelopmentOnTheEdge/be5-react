import {registerDocument} from "../core/registers/documents";
import {registerRoute} from "../core/registers/routes";
import FrontendAction from "../services/model/FrontendAction";
import {COLUMN_SETTINGS_KEY, GO_BACK, OPEN_DEFAULT_ROUTE, ROLE_GUEST} from "../constants";
import be5 from "../be5";
import {getCurrentRoles} from "../store/selectors/user.selectors";

export const arraysEqual = function (a, b) {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

export const registerPage = (actionName, component, fn) => {
  registerDocument(actionName, component);
  registerRoute(actionName, fn);
};

export const createPageValue = (actionName, data, url) => {
  return {
    value: {data: Object.assign({}, data, {links: {self: url || actionName}})},
    frontendParams: {type: actionName}
  }
};

/* https://stackoverflow.com/a/7627603 */
export const makeSafeForClassName = (name) => {
  return name.replace(/[^a-zA-Z0-9]/g, function (s) {
    const c = s.charCodeAt(0);
    if (c === 32) return '-';
    return '__' + ('000' + c.toString(16)).slice(-4);
  });
};

export const getBackOrOpenDefaultRouteAction = () => {
  if (window.history.length > 1) {
    return new FrontendAction(GO_BACK);
  } else {
    return new FrontendAction(OPEN_DEFAULT_ROUTE);
  }
};

export const getBackAction = () => {
  if (window.history.length > 1) {
    return new FrontendAction(GO_BACK);
  } else {
    return undefined;
  }
};

export const hashUrlIsEmpty = (url) => {
  return url === '' || url === '#' || url === '#!';
};

export const isGuest = () => {
  return be5.getStoreState() && getCurrentRoles(be5.getStoreState()) && getCurrentRoles(be5.getStoreState()).includes(ROLE_GUEST);
}

export const setColumnSettings = (table_name, query_name, column_name, settingName, settingValue) => {
  let settings = JSON.parse(localStorage.getItem(COLUMN_SETTINGS_KEY));
  if(!settings || !Array.isArray(settings)){
    settings = [];
  }
  let querySettings = settings.find( el => el.table_name == table_name && el.query_name === query_name);
  if(!querySettings){
    settings.push({
      table_name: table_name,
      query_name: query_name,
      columnSettings: [{column_name: column_name, [settingName]: settingValue}]
    });
  } else {
    const columnSetting = querySettings.columnSettings.find( el => el.column_name === column_name);
    if(!columnSetting){
      querySettings.columnSettings.push({column_name: column_name, [settingName]: settingValue})
    } else{
      columnSetting[settingName] = settingValue;
    }
  }
  localStorage.setItem(COLUMN_SETTINGS_KEY, JSON.stringify(settings))
}

export const getColumnSettings = (table_name, query_name, column_name, settingName) => {
  const settings = JSON.parse(localStorage.getItem(COLUMN_SETTINGS_KEY));
  if (settings) {
    const querySettings = settings.find(el => el.table_name === table_name && el.query_name === query_name);
    if (querySettings) {
      const columnSetting = querySettings.columnSettings.find(el => el.column_name === column_name);
      if (columnSetting) {
        return columnSetting[settingName];
      }
    }
  }
  return null;
}