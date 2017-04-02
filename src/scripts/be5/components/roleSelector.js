import React from 'react';
import be5 from 'be5/be5';
import bus from 'be5/core/bus';

be5.load.css("css/roleSelector.css");

const Role = React.createClass({
  displayName: 'Role',
  
  propTypes: {
    onChange: React.PropTypes.func.isRequired
  },
  
  getInitialState() {
    return { selectedRoles : this.props.selectedRoles };
  },
  
  render() {
    var id = this.props.name + "-checkbox";
    return (
      React.DOM.div({className: "role"}, 
        React.DOM.input({type: "checkbox", checked: this.state.selectedRoles, id: id, onChange: this._onChange}), 
        React.DOM.label({htmlFor: id}, React.DOM.span({className: "checkBox"}), this.props.name)
      )
    );
  },
  
  _onChange(e) {
    this.setState({ selectedRoles : e.target.checked }, this.props.onChange);
  }
});

export default React.createClass({
  displayName: 'RoleBox',
  
  getInitialState() {
    return { availableRoles: ["Unknown"], selectedRoles: ["Unknown"] };
  },
  
  render() {
    if (this.state.availableRoles.length <= 1) {
      return ( React.DOM.div({className: "roleBox"}) );
    }
    var selectedRoles = this.state.selectedRoles;
    var roleNodes = this.state.availableRoles.map(function (role) {
      return (
        React.createElement(Role, {key: role, ref: role, name: role, selectedRoles: $.inArray(role, selectedRoles) != -1, onChange: this._onRoleChange})
      );
    }.bind(this));
    return (
      React.DOM.div({className: "roleBox"}, 
        React.DOM.h4({}, be5.messages.roles), 
        roleNodes
      )
    );
  },
  
  componentDidMount() {
    this.refresh();
  },
  
  refresh() {
    be5.net.request('roleSelector', {}, data => this.setState(data));
  },
  
  _onRoleChange() {
    var roles = this.state.availableRoles.filter(name => this.refs[name].state.selectedRoles);
    this._changeRoles(roles.join(","));
  },
  
  _changeRoles(roles) {
    be5.net.request('roleSelector/select', { roles: roles }, data => {
      this.setState(data);
      bus.fire('RoleChanged', {});
    });
  }
});
