import React from 'react';
import SideBar from './SideBar';
import Document from '../containers/Document';
import SplitPane from 'react-split-pane';
import Be5Components from "./Be5Components";
import {MAIN_DOCUMENT} from "../constants";


const Application = () => {
  return (
    <div>
      <Be5Components/>
      <SplitPane split="vertical" defaultSize={280} className="main-split-pane">
        <div className="side-pane">
          <SideBar/>
        </div>
        <div className="main-pane">
          <Document frontendParams={{documentName: MAIN_DOCUMENT}}/>
        </div>
      </SplitPane>
    </div>
  );
};

export default Application;
