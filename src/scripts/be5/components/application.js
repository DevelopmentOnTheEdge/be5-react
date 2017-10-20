import React from 'react';
import bus from '../core/bus';
import SideBar from './sideBar';
import Document from './document';
import SplitPane from 'react-split-pane';
import Alert from 'react-s-alert';

export default React.createClass({
  displayName: 'App',
  
  componentDidMount: function() {
    bus.listen('LoggedOut', this.refresh);
    bus.listen('LoggedIn', this.refresh);
    bus.listen('LanguageChanged', this.refresh);
    bus.listen('RoleChanged', this.refresh);
    bus.listen("alert", data => {
      if (data.type === "success") {
        Alert.success(data.msg, {
          position: 'top-right',
          effect: 'slide',
        });
      } else {
        Alert.error(data.msg, {
          position: 'top-right',
          effect: 'slide'
        });
      }

    } );
  },

  render: function() {
    return (
      <div>
        <Alert/>
        <SplitPane split="vertical" defaultSize={280} >
          <SideBar ref="sideBar"/>
          <Document ref="document"/>
        </SplitPane>
      </div>
    );

  },
  
  refresh: function() {
    this.refs.sideBar.refresh();
  }
});
