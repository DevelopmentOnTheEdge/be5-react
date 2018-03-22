import UserControl       from '../components/UserControl'
import { connect }       from 'react-redux'
import { userActions }   from '../store/actions/index'
import { userSelectors } from '../store/selectors/index'


const mapDispatchToProps = dispatch => ({
  toggleRoles: roles => dispatch(userActions.toggleRoles(roles))
});

export default connect(
  userSelectors.getUser,
  mapDispatchToProps
)(UserControl)
