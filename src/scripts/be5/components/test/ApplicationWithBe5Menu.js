import React from 'react';
import bus from '../../core/bus';
import be5 from '../../be5';
import Be5Menu from '../be5Menu/Be5Menu';
import Document from '../../containers/Document';
import Be5Components from "../Be5Components";


class ApplicationWithBe5Menu extends React.Component
{
  render() {
    return (
      <div>
        <Be5Components/>
        <Be5Menu ref="menu" show={true}/>
        <div className="container">
          <div className="row">
            <Document ref="document" frontendParams={{documentName: be5.MAIN_DOCUMENT}} />
          </div>
        </div>
      </div>
    );

  }

}

export default ApplicationWithBe5Menu;