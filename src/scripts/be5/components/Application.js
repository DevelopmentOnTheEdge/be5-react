import React         from 'react';
import be5           from '../be5';
import SideBar       from './SideBar';
import Document      from '../containers/Document';
import SplitPane     from 'react-split-pane';
import Be5Components from "./Be5Components";


const Application = () => {
  return (
    <div>
      <Be5Components/>
      <SplitPane split="vertical" defaultSize={280} className="main-split-pane">
        <SideBar/>
        <Document frontendParams={{documentName: be5.mainDocumentName}} />
      </SplitPane>
    </div>
  );
};

export default Application;