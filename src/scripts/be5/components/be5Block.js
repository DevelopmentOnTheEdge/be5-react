import React from 'react';
import be5 from 'be5/be5';
import SimpleTable from 'be5/components/simpleTable';

export default React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired
  },
  
  displayName: 'Be5Block',
  
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
      <SimpleTable entity={this.props.entity} query={this.props.query} responsive={this.props.responsive} showHead={this.props.showHead}/>
    );
  }
});
