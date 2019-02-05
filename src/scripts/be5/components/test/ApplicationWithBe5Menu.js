import React from 'react';
import NavbarMenuContainer from '../../containers/NavbarMenuContainer';
import Document from '../../containers/Document';
import Be5Components from "../Be5Components";
import {MAIN_DOCUMENT} from "../../constants";


class ApplicationWithBe5Menu extends React.Component {
  render() {
    return (
      <div>
        <Be5Components/>
        <NavbarMenuContainer brand='Be5App'/>
        <div className="container">
          <div className="row">
            <Document ref="document" frontendParams={{documentName: MAIN_DOCUMENT}}/>
          </div>
        </div>
      </div>
    );

  }

}

export default ApplicationWithBe5Menu;
