import React               from 'react';
import Menu                from '../components/menu/Menu'
import { connect }         from 'react-redux'
import { fetchMenu }       from '../store/actions/menu.actions'
import { getMenu }         from '../store/selectors/menu.selectors'
import { getCurrentRoles } from '../store/selectors/user.selectors'


const MenuContainer = props => <Menu {...props} />;

const mapStateToProps = state => ({
  menu: getMenu(state),
  currentRoles: getCurrentRoles(state),
});

const mapDispatchToProps = dispatch => ({
  fetchMenu: roles => dispatch(fetchMenu('menu'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuContainer)
