import { connect }    from 'react-redux'
import { userActions } from '../actions'
import RoleBox        from '../components/RoleBox'


const mapStateToProps = state => ({
  availableRoles: state.user.availableRoles || [],
  selectedRoles: state.user.selectedRoles || []
});

const mapDispatchToProps = dispatch => ({
  toggleRoles: roles => dispatch(userActions.toggleRoles(roles))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleBox)
