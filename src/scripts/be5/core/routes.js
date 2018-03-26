const routes = {};

export const getRoute = (actionName) => {
  return routes[actionName];
};

export const registerRoute = (actionName, fn) => {
  routes[actionName] = fn;
};

export const getAllRoutes = () => {
  return Object.keys(routes);
};
