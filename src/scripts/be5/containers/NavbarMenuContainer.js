import React from 'react';
import NavbarMenu from '../components/menu/NavbarMenu'
import {connect} from 'react-redux'
import {fetchMenu} from '../store/actions/menu.actions'
import {getMenu} from '../store/selectors/menu.selectors'
import {getDefaultRoute, getUser} from '../store/selectors/user.selectors'
import {toggleRoles} from "../store/actions/user.actions";
import {getHashUrl} from "../store/selectors/url.selectors";


const NavbarMenuContainer = props => {
  const Component = props.component || NavbarMenu;
  return <Component {...props} />;
};

const mapStateToProps = state => ({
  menu: getMenu(state),
  user: getUser(state),
  defaultRoute: getDefaultRoute(state),
  url: getHashUrl(state)
});

const mapDispatchToProps = dispatch => ({
  toggleRoles: roles => dispatch(toggleRoles(roles)),
  fetchMenu: roles => dispatch(fetchMenu('menu/withIds'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarMenuContainer)
