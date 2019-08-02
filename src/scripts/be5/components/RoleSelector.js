import React from 'react';
import PropTypes from 'prop-types';
import be5 from '../be5';
import {UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button} from 'reactstrap';


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

const RoleSelector = (props) => {

  function onRoleChange(name) {
    let roles = [...props.currentRoles];
    let containRoleIndex = roles.indexOf(name);

    if (containRoleIndex !== -1) {
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

  if (props.availableRoles.length <= 1) {
    return ( <div/> );
  }

  const roleNodes = props.availableRoles.map((role) =>
    <Role key={role} name={role} checked={props.currentRoles.indexOf(role) !== -1} onChange={() => onRoleChange(role)}/>
  );

  return (
    <UncontrolledDropdown size={props.size} className="roleBox mr-sm-2" id={props.id}>
      <DropdownToggle caret>{be5.messages.roles}</DropdownToggle>

      <DropdownMenu>
        {roleNodes}
        <DropdownItem divider/>

        <div className="roleBox_add-actions">
          {be5.locale.msg('selectRoles') + ' '}
          <Button onClick={handleSelectAll} color="primary" className="enable-all"
                  size="sm">{be5.locale.msg('allRoles')}</Button>{' '}
          <Button onClick={handleClear} color="secondary" className="disable-all"
                  size="sm">{be5.locale.msg('clearRoles')}</Button>
        </div>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

RoleSelector.propTypes = {
  id: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  currentRoles: PropTypes.array.isRequired,
  availableRoles: PropTypes.array.isRequired,
  toggleRoles: PropTypes.func.isRequired
};

export default RoleSelector;
