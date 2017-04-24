import React from 'react';
import be5 from 'be5/be5';

be5.load.css('be5/css/menuFooter.css');

export default React.createClass({
  displayName: 'MenuFooter',
  
  render() {
    return (
      <div className="menuFooter">
        <img src={be5.net.resourceUrl('images/logo-be.png')}/>
      </div>
    );
  }
});
