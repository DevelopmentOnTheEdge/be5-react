import React        from 'react';
import PropTypes    from 'prop-types';
import RoleSelector from '../components/RoleSelector'
import classNames   from 'classnames';

import reloadImg from '../../../images/reload.png';

const UserControl = (props) => {
  const {
    userName,
    loggedIn,
    currentRoles,
    availableRoles
  } = props.user;

  if(!loggedIn) {
    return null;
  }

  function reLogin(){
    if(props.hasDevRole)
    {
      return (
        <span onClick={props.openReLoginForm} className={"document-reload float-right"}>
          <img src={reloadImg} alt={"Login"} title={"Login"} />
        </span>
      );
    }
    return null;
  }

  return (
    <div className={classNames('user-control', props.className || 'form-inline mb-2')}>
      <RoleSelector
        size={props.size}
        currentRoles={currentRoles}
        availableRoles={availableRoles}
        toggleRoles={props.toggleRoles}
      />
      <label>{userName}</label>
      {reLogin()}
    </div>
  );
};

UserControl.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
  user: PropTypes.shape({})
};

export default UserControl;