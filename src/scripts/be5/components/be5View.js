/**
 * This is a super component that can do everything. 
 */
import React from 'react';
import _ from 'underscore';
import be5 from 'be5/be5';
import Forms from 'be5/services/forms';
import Form from 'be5/components/form';
import Tables from 'be5/services/tables';
import Table from 'be5/components/table';
import StaticPage from 'be5/components/staticPage';

const services = {
  'table': Tables,
  'form': Forms
};
const components = {
  'table': Table,
  'form': Form,
  'static': StaticPage
};

export default React.createClass({
  displayName: 'Be5View',
  
  propTypes: {
    type: React.PropTypes.string.isRequired,
    params: React.PropTypes.any.isRequired
  },
  
  getInitialState() {
    return { type: 'loading', value: be5.messages.loading };
  },
  
  componentDidMount() {
    this._requestData(this.props.type, this.props.params);
  },
  
  render() {
    if (this.state.type === 'loading') {
      return React.DOM.div({}, React.DOM.h1({ className: 'text-center' }, this.state.value));
    }
    
    return React.createElement(this._getComponent(this.state.type), this.state);
  },
  
  _requestData(type, params) { 
    this._getService(type).load(params, this._onLoad);
  },
  
  _onLoad(data) {
    this.setState(data);
  },
  
  _getService(type) {
    if (services[type]) {
      return services[type];
    }
    throw this._createUnkonwnComponentType(type);
  },
  
  _getComponent(type) {
    if (components[type]) {
      return components[type];
    }
    throw this._createUnkonwnComponentType(type);
  },
  
  _createUnkonwnComponentType(type) {
    return {
      name: 'UnknownComponentType',
      message: `Unknown component "${type}"`
    };
  }
});
