import React from 'react';
import be5 from 'be5/be5';

export default React.createClass({
  displayName: 'MenuHeader',
  
  getInitialState() {
    return {
      message: be5.messages.welcome
    };
  },
  
  render() {
    return (
      <div className="menuHeader">
        <h1>{this.state.message}</h1>
      </div>
    );
  }
});
