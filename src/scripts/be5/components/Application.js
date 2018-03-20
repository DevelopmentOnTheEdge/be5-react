import React         from 'react';
import bus           from '../core/bus';
import be5           from '../be5';
import SideBar       from './SideBar';
import Document      from './Document';
import SplitPane     from 'react-split-pane';
import Be5Components from "./Be5Components";


class Application extends React.Component
{
  constructor(props) {
    super(props);

    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    bus.listen('RefreshAll', this.refresh);
  }

  render() {
    return (
      <div>
        <Be5Components/>
        <SplitPane split="vertical" defaultSize={280} className="main-split-pane">
          <SideBar ref="sideBar"/>
          <Document ref="document" frontendParams={{documentName: be5.mainDocumentName}} />
        </SplitPane>
      </div>
    );

  }

  refresh() {
    this.refs.sideBar.refresh();
  }
}

export default Application;