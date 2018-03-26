import Menu              from '../components/menu/Menu'
import { connect }       from 'react-redux'
import { fetchMenu }     from '../store/actions/menuActions'
import { getMenu } from '../store/selectors/menuSelectors'
import { getCurrentRoles } from '../store/selectors/userSelectors'


const mapStateToProps = state => ({
  menu: getMenu(state),
  currentRoles: getCurrentRoles(state),
});

const mapDispatchToProps = dispatch => ({
  fetchMenu: roles => dispatch(fetchMenu())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)
