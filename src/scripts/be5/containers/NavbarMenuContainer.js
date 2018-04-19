import React           from 'react';
import NavbarMenu      from '../components/menu/NavbarMenu'
import { connect }     from 'react-redux'
import { fetchMenu }   from '../store/actions/menu.actions'
import { getMenu }     from '../store/selectors/menu.selectors'
import { getUser }     from '../store/selectors/user.selectors'
import { toggleRoles } from "../store/actions/user.actions";
import be5             from "../be5";


const NavbarMenuContainer = props => <NavbarMenu {...props} />;

const mapStateToProps = state => ({
  menu: getMenu(state),
  user: getUser(state),
  url: be5.url.get()
});

const mapDispatchToProps = dispatch => ({
  toggleRoles: roles => dispatch(toggleRoles(roles)),
  fetchMenu: roles => dispatch(fetchMenu('menu/withIds'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarMenuContainer)
