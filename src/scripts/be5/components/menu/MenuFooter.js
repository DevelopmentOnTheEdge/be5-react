import React from 'react';

import logoBe from '../../../../images/logo-be.png';

export default React.createClass({
  displayName: 'MenuFooter',

  render() {
    return (
      <div className="menuFooter">
        <img src={logoBe}/>
      </div>
    );
  }
});
