export const userSelectors = {
  getUser,
  getCurrentRoles
};

function getUser(state) {
  return {
    user: state.user
  };
}

function getCurrentRoles(state) {
  return {
    currentRoles: state.user.currentRoles
  };
}
