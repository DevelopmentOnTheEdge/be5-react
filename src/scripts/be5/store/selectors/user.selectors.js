export const getUser = (state) => {
  return state.user;
};

export const getCurrentRoles = (state) => {
  return state.user.currentRoles;
};

export const getDefaultRoute = (state) => {
  return state.user.defaultRoute;
};
