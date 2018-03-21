export const userSelectors = {
  getUserRoles: getUserRoles
};

function getUserRoles(state) {
  return {
    availableRoles: state.user.availableRoles,
    selectedRoles: state.user.selectedRoles
  };
}
