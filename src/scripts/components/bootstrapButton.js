import React from 'react';
import 'bootstrap';
  
export default React.createClass({
  displayName: 'BootstrapButton',
  
  propTypes: {
    className: React.PropTypes.string,
    onClick: React.PropTypes.func
  },
  
  render() {
    const className = 'btn' + (this.props.className ? ' ' + this.props.className : '');
    return <button type="button" className={className} onClick={this.props.onClick}>{this.props.children}</button>;
  }
});
