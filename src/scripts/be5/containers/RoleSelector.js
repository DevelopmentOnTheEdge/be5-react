import { connect }    from 'react-redux'
import { userActions } from '../store/actions/index'
import { userSelectors } from '../store/selectors/index'
import RoleBox        from '../components/RoleBox'


const mapDispatchToProps = dispatch => ({
  toggleRoles: roles => dispatch(userActions.toggleRoles(roles))
});

export default connect(
  userSelectors.getUserRoles,
  mapDispatchToProps
)(RoleBox)
