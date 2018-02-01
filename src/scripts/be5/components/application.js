import React from 'react';
import bus from '../core/bus';
import SideBar from './sideBar';
import Document from './document';
import SplitPane from './splitPane';
import Alert from 'react-s-alert';

export default React.createClass({
  displayName: 'Application',

  componentDidMount: function() {
    bus.listen('LoggedOut', this.refresh);
    bus.listen('LoggedIn', this.refresh);
    bus.listen('LanguageChanged', this.refresh);
    bus.listen('RoleChanged', this.refresh);
    bus.listen("alert", data => {
      console.log(data);
      if (data.type === 'error') {
        Alert.error(data.msg, {
          position: 'top-right',
          timeout: 5000
        });
      } else {
        Alert.success(data.msg, {
          position: 'top-right',
          timeout: 5000
        });
      }
    });
  },
  render: function() {
    return (
      <div>
        <Alert stack={{limit: 10}}/>
        <SplitPane split="vertical" defaultSize={280} >
          <SideBar ref="sideBar"/>
          <Document ref="document" onChange={()=>{}}/>
        </SplitPane>
      </div>
    );

  },

  refresh: function() {
    this.refs.sideBar.refresh();
  },
});