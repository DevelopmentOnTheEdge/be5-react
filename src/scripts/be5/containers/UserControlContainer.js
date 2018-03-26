import UserControl     from '../components/UserControl'
import { connect }     from 'react-redux'
import { toggleRoles } from '../store/actions/userActions'
import { getUser }          from '../store/selectors/userSelectors'


const mapStateToProps = state => ({
  user: getUser(state)
});

const mapDispatchToProps = dispatch => ({
  toggleRoles: roles => dispatch(toggleRoles(roles))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserControl)
