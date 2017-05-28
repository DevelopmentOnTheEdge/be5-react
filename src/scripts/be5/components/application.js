import React from 'react';
import bus from 'be5/core/bus';
import SideBar from 'be5/components/sideBar';
import Document from 'be5/components/document';
import SplitPane from 'be5/components/splitPane';
  
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
      <SplitPane split="vertical" defaultSize={280}>
        <SideBar ref="sideBar"/>
        <Document ref="document"/>
      </SplitPane>
    );
  },
  
  refresh: function() {
    this.refs.sideBar.refresh();
  }
});
