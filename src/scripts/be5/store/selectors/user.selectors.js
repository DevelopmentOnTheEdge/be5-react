export const userSelectors = {
  getUser,
  getUserRoles
};

function getUser(state) {
  return {
    user: state.user
  };
}

function getUserRoles(state) {
  return {
    availableRoles: state.user.availableRoles,
    selectedRoles: state.user.selectedRoles
  };
}
