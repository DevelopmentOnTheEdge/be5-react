import be5 from '../be5';
import bus from '../core/bus';
import React, { Component } from 'react';

import '../../../css/roleSelector.css';

class Role extends Component {
    constructor(props) {
        super(props);

        this._onChange = this._onChange.bind(this);

    }

    static getInitialState() {
        return { selectedRoles : this.props.selectedRoles };
    }

    render() {
        const id = this.props.name + "-checkbox";
        return (
            React.DOM.div({className: "role"},
                React.DOM.input({type: "checkbox", checked: this.state.selectedRoles, id: id, onChange: this._onChange}),
                React.DOM.label({htmlFor: id}, React.DOM.span({className: "checkBox"}), this.props.name)
            )
        );
    }

    _onChange(e) {
        this.setState({ selectedRoles : e.target.checked }, this.props.onChange);
    }
}

class RoleBox extends Component {
    constructor(props) {
        super(props);

        this._onRoleChange = this._onRoleChange.bind(this);
        this._changeRoles = this._changeRoles.bind(this);
    }

    static getInitialState() {
        return { availableRoles: ["Unknown"], selectedRoles: ["Unknown"] };
    }

    render() {
        if (this.state.availableRoles.length <= 1) {
            return ( React.DOM.div({className: "roleBox"}) );
        }
        const selectedRoles = this.state.selectedRoles;
        const roleNodes = this.state.availableRoles.map(function (role) {
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
    }

    _changeRoles(roles) {
        be5.net.request('roleSelector/select', { roles: roles }, data => {
            this.setState(data);
            bus.fire('RoleChanged', {});
        });
    }
}

