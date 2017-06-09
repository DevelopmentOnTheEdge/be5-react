import React from 'react';
import be5 from '../be5';
import SimpleForm from './simpleForm';

export default React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired
  },
  
  displayName: 'Be5Form',
  
  getInitialState() {
    return {};
  },
  
  render() {
    return (
      <div className="card card-block">
        <h3 className="card-title">{this.props.title}</h3>
        {this._getContent()}
      </div>
    );
  },
  
  _getContent() {
    return (
      <SimpleForm entity={this.props.entity} query={this.props.query} operation={this.props.operation}/>
    );
  }
});
