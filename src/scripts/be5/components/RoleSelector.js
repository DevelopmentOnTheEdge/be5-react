import be5 from '../be5';
import bus from '../core/bus';
import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button} from 'reactstrap';

import '../../../css/roleSelector.css';


class Role extends Component
{
  render() {
    const id = this.props.name + "-checkbox";
    return (
      <div className={"role"}>
        <input type="checkbox" id={id} checked={this.props.state} onChange={() => this.props.onChange()} />
        <label htmlFor={id}><span className={"checkBox"}/>{this.props.name}</label>
      </div>
    )
  }
}

Role.propTypes = {
  onChange: PropTypes.func.isRequired
};

class RoleBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      availableRoles: ["Unknown"], selectedRoles: ["Unknown"]
    };

    this._onRoleChange = this._onRoleChange.bind(this);
    this._changeRoles = this._changeRoles.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }


  handleSelectAll() {
    this._changeRoles(this.state.availableRoles.join(","))
  }

  handleClear() {
    this._changeRoles("")
  }

  render() {
    if (this.state.availableRoles.length < 1) {
      return ( <div className={'roleBox'}/> );
    }
    const selectedRoles = this.state.selectedRoles;
    const roleNodes = this.state.availableRoles.map((role) =>
      <Role key={role} ref={role} name={role} state={selectedRoles.indexOf(role) !== -1} onChange={() => this._onRoleChange(role)}/>
    );

    return (
      <div className={'roleBox'}>
        <UncontrolledDropdown size="sm">
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
        <div className="roleBox_username">
          {this.state.username}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    be5.net.request('roleSelector', {}, data => this.setState(data));
  }

  _onRoleChange(name) {
    let roles = this.state.selectedRoles;
    let containRoleIndex = roles.indexOf(name);

    if ( containRoleIndex !== -1) {
      roles.splice(roles.indexOf(name), 1);
    } else  {
       roles.push(name);
    }

     this._changeRoles(roles.join(","));
  }

  _changeRoles(roles) {
    be5.net.request('roleSelector/select', { roles: roles }, data => {
      this.setState(data);
      bus.fire('RoleChanged', {});
    });

  }
}

export default RoleBox;