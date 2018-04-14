import React               from 'react';
import NavbarMenu          from '../components/menu/NavbarMenu'
import { connect }         from 'react-redux'
import { fetchMenu }       from '../store/actions/menu.actions'
import { getMenu }         from '../store/selectors/menu.selectors'
import {getCurrentRoles, getUser} from '../store/selectors/user.selectors'


const NavbarMenuContainer = props => <NavbarMenu {...props} />;

const mapStateToProps = state => ({
  menu: getMenu(state),
  currentRoles: getCurrentRoles(state),
  loggedIn: getUser(state).loggedIn
});

const mapDispatchToProps = dispatch => ({
  fetchMenu: roles => dispatch(fetchMenu('menu/withIds'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarMenuContainer)
