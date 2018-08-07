import UserControl     from '../components/UserControl'
import { connect }     from 'react-redux'
import { toggleRoles } from '../store/actions/user.actions'
import { getUser, getCurrentRoles }          from '../store/selectors/user.selectors'
import {ROLE_SYSTEM_DEVELOPER} from "../constants";
import be5 from "../be5";
import {openOperationByUrl} from "../services/forms";


const openReLoginForm = () => {
  openOperationByUrl('form/users/All records/Login/withoutUpdateUserInfo=true', {
    documentName: be5.MAIN_MODAL_DOCUMENT
  })
};

const mapStateToProps = state => ({
  user: getUser(state),
  hasDevRole: getCurrentRoles(state).indexOf(ROLE_SYSTEM_DEVELOPER) !== -1
});

const mapDispatchToProps = dispatch => ({
  toggleRoles: roles => dispatch(toggleRoles(roles)),
  openReLoginForm: openReLoginForm
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserControl)
