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

export const createPageValue = (actionName, data) => {
  return {
    value: {data: Object.assign({}, data, {links: {self: actionName}})},
    frontendParams: {type: actionName}
  }
};
