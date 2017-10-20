import be5 from '../be5';
import bus from '../core/bus';
import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button} from 'reactstrap';

import '../../../css/roleSelector.css';


class Role extends Component
{
  constructor(props) {
    super(props);
    this.state = {selectedRoles : this.props.selectedRoles};

    this._onChange = this._onChange.bind(this);
  }

  render() {
    const id = this.props.name + "-checkbox";
    return (
      <div className={"role"}>
        <input type="checkbox" id={id} checked={this.state.selectedRoles} onChange={this._onChange} />
        <label htmlFor={id}><span className={"checkBox"}/>{this.props.name}</label>
      </div>
    )
  }

  _onChange(e) {
    this.setState({ selectedRoles : e.target.checked }, this.props.onChange);
  }
}

Role.propTypes = {
  onChange: PropTypes.func.isRequired
};

class RoleBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      availableRoles: ["Unknown"], selectedRoles: ["Unknown"]
    };

    this._onRoleChange = this._onRoleChange.bind(this);
    this._changeRoles = this._changeRoles.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleSelectAll() {
    this._changeRoles(this.state.availableRoles.join(","))
  }

  handleClear() {
    this._changeRoles("")
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    if (this.state.availableRoles.length <= 1) {
      return ( <div className={'roleBox'}/> );
    }
    const selectedRoles = this.state.selectedRoles;
    const roleNodes = this.state.availableRoles.map((role) =>
      <Role key={role} ref={role} name={role} selectedRoles={$.inArray(role, selectedRoles) != -1} onChange={this._onRoleChange}/>
    );

    //todo use toggle, after remove bootstrap.js
    return (
      <div className={'roleBox'}>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={ () => {}}>
          <DropdownToggle caret>{be5.messages.roles}</DropdownToggle>

          <DropdownMenu>
            {roleNodes}
            <DropdownItem divider />

            <div className="roleBox_add-actions">
              кнопки в разработке<br/>
              <Button onClick={this.handleSelectAll} color="primary" size="sm">Выбрать всё</Button>{' '}
              <Button onClick={this.handleClear} color="secondary" size="sm">Очистить всё</Button>
            </div>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    be5.net.request('roleSelector', {}, data => this.setState(data));
  }

  _onRoleChange() {
    let roles = this.state.availableRoles.filter(name => this.refs[name].state.selectedRoles);
    this._changeRoles(roles.join(","));
    console.log(this.state.availableRoles, roles)
  }

  _changeRoles(roles) {
    be5.net.request('roleSelector/select', { roles: roles }, data => {
      this.setState(data);
      bus.fire('RoleChanged', {});
    });
  }
}

export default RoleBox;