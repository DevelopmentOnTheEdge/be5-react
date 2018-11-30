import {registerDocument} from "../core/documents";
import {registerRoute} from "../core/routes";

export const arraysEqual = function(a, b)
{
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
  return name.replace(/[^a-zA-Z0-9]/g, function(s) {
    const c = s.charCodeAt(0);
    if (c === 32) return '-';
    return '__' + ('000' + c.toString(16)).slice(-4);
  });
};
