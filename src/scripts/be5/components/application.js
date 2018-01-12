import React from 'react';
import bus from '../core/bus';
import SideBar from './sideBar';
import Document from './document';
import SplitPane from './splitPane';
import AlertContainer from 'react-alert';
import Alert from 'react-s-alert';

export default React.createClass({
  displayName: 'Application',

  componentDidMount: function() {
    bus.listen('LoggedOut', this.refresh);
    bus.listen('LoggedIn', this.refresh);
    bus.listen('LanguageChanged', this.refresh);
    bus.listen('RoleChanged', this.refresh);
    bus.listen("alert", data => {
      this.msg.show(data.msg, data);
      console.log(data);
    });
  },

  handleClick(e) {
    e.preventDefault();
    Alert.error(
      bus.listen("alert", data => {
        this.msg.show(data.msg, data);
    }), {
      position: 'top-right',
      effect: 'slide',
      timeout: 5000
    });
  },

  render: function() {
    const alertOptions = {
      offset: 14,
      position: 'top right',
      theme: 'light',
      time: 5000,
      transition: 'fade',
      icon: null
    };
    return (
      <div>
        <AlertContainer ref={a => this.msg = a} {...alertOptions}/>
        <Alert stack={{limit: 3}}/>
        <SplitPane split="vertical" defaultSize={280} >
          <SideBar ref="sideBar"/>
          <div>
            <a href="#" onClick={this.handleClick}>Click 1</a>
          </div>

          <Document ref="document" onChange={()=>{}}/>
        </SplitPane>
      </div>
    );

  },

  refresh: function() {
    this.refs.sideBar.refresh();
  }
});
