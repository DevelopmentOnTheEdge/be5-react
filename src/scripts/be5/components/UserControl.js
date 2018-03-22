import React        from 'react';
import PropTypes    from 'prop-types';
import RoleSelector from '../components/RoleSelector'
import classNames   from 'classnames';


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

  return (
    <div className={classNames('user-control', props.className || 'form-inline mb-2')}>
      <RoleSelector
        size={props.size}
        currentRoles={currentRoles}
        availableRoles={availableRoles}
        toggleRoles={props.toggleRoles}
      />
      <label>{userName}</label>
    </div>
  );
};

UserControl.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
  user: PropTypes.shape({})
};

export default UserControl;