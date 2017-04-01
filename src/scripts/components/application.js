import React from 'react';
import be5 from 'be5';
import bus from 'be5/bus';
import SideBar from 'components/sideBar';
import Document from 'components/document';
import SplitPane from 'components/splitPane';
  
export default React.createClass({
  displayName: 'App',
  
  componentDidMount: function() {
    bus.listen('LoggedOut', this.refresh);
    bus.listen('LoggedIn', this.refresh);
    bus.listen('LanguageChanged', this.refresh);
    bus.listen('RoleChanged', this.refresh);
  },
  
  render: function() {
    return (
      <SplitPane split="vertical" defaultSize={300}>
        <SideBar ref="sideBar"/>
        <Document ref="document"/>
      </SplitPane>
    );
  },
  
  refresh: function() {
    this.refs.sideBar.refresh();
  }
});
