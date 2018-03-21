import React        from 'react';
import PropTypes    from 'prop-types';
import RoleSelector from './RoleSelector'
import classNames   from 'classnames';

import { connect }    from 'react-redux'
import { userSelectors } from '../store/selectors/index'

const UserControlBox = (props) => {

  if(!props.user.loggedIn){
    return null;
  }

  return (
    <div className={classNames('user-control', props.className || 'form-inline mb-2')}>
      <RoleSelector size={props.size}/>
      <label>{props.user.userName}</label>
    </div>
  );
};

UserControlBox.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string
};


export {
  UserControlBox
};

export default connect(
  userSelectors.getUser,
  () => {}
)(UserControlBox)
