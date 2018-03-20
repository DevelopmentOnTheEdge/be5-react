import React      from 'react';
import PropTypes  from 'prop-types';
import be5        from '../be5';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button} from 'reactstrap';


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

class RoleBox extends React.Component {
  constructor(props) {
    super(props);

    this.onRoleChange = this.onRoleChange.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  onRoleChange(name)
  {
    let roles = [...this.props.selectedRoles];
    let containRoleIndex = roles.indexOf(name);

    if ( containRoleIndex !== -1) {
      roles.splice(roles.indexOf(name), 1);
    } else {
      roles.push(name);
    }

    this.props.toggleRoles(roles.join(","));
  }

  handleSelectAll() {
    this.props.toggleRoles(this.props.availableRoles.join(","))
  }

  handleClear() {
    this.props.toggleRoles("")
  }

  render() {
    if (this.props.availableRoles.length < 1)
    {
      return ( <div/> );
    }

    const roleNodes = this.props.availableRoles.map((role) =>
      <Role key={role} name={role} checked={this.props.selectedRoles.indexOf(role) !== -1} onChange={() => this.onRoleChange(role)}/>
    );

    return (
      <UncontrolledDropdown size={this.props.size} className="roleBox mr-sm-2">
        <DropdownToggle caret>{be5.messages.roles}</DropdownToggle>

        <DropdownMenu>
          {roleNodes}
          <DropdownItem divider />

          <div className="roleBox_add-actions">
            Выбрать:{' '}
            <Button onClick={this.handleSelectAll} color="primary" className="enable-all" size="sm">Всё</Button>{' '}
            <Button onClick={this.handleClear} color="secondary" className="disable-all" size="sm">Ничего</Button>
          </div>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

}

RoleBox.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
  selectedRoles: PropTypes.array,
  availableRoles: PropTypes.array,
};


export default RoleBox;