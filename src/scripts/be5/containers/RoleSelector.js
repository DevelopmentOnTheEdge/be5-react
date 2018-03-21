import React      from 'react';
import PropTypes  from 'prop-types';
import be5        from '../be5';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button} from 'reactstrap';

import { connect }    from 'react-redux'
import { userActions } from '../store/actions/index'
import { userSelectors } from '../store/selectors/index'


const Role = (props) => {
  const id = props.name + "-checkbox";

  return (
    <div className={"role"}>
      <input
        type="checkbox"
        id={id}
        checked={props.checked}
        onChange={props.onChange}
      />
      <label htmlFor={id}><span className={"checkBox"}/>{props.name}</label>
    </div>
  );
};

Role.propTypes = {
  onChange: PropTypes.func.isRequired
};

const RoleBox = (props) => {

  function onRoleChange(name)
  {
    let roles = [...props.selectedRoles];
    let containRoleIndex = roles.indexOf(name);

    if ( containRoleIndex !== -1) {
      roles.splice(roles.indexOf(name), 1);
    } else {
      roles.push(name);
    }

    props.toggleRoles(roles.join(","));
  }

  function handleSelectAll() {
    props.toggleRoles(props.availableRoles.join(","))
  }

  function handleClear() {
    props.toggleRoles("")
  }

  if(props.availableRoles.length < 1)
  {
    return ( <div/> );
  }

  const roleNodes = props.availableRoles.map((role) =>
    <Role key={role} name={role} checked={props.selectedRoles.indexOf(role) !== -1} onChange={() => onRoleChange(role)}/>
  );

  return (
    <UncontrolledDropdown size={props.size} className="roleBox mr-sm-2">
      <DropdownToggle caret>{be5.messages.roles}</DropdownToggle>

      <DropdownMenu>
        {roleNodes}
        <DropdownItem divider />

        <div className="roleBox_add-actions">
          Выбрать:{' '}
          <Button onClick={handleSelectAll} color="primary" className="enable-all" size="sm">Всё</Button>{' '}
          <Button onClick={handleClear} color="secondary" className="disable-all" size="sm">Ничего</Button>
        </div>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

RoleBox.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
  selectedRoles: PropTypes.array,
  availableRoles: PropTypes.array,
};


export {
  RoleBox
};

const mapDispatchToProps = dispatch => ({
  toggleRoles: roles => dispatch(userActions.toggleRoles(roles))
});

export default connect(
  userSelectors.getUserRoles,
  mapDispatchToProps
)(RoleBox)
