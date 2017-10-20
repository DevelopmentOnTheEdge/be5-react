import React, { Component } from 'react';
import bus from '../core/bus';
import SideBar from './sideBar';
import Document from './document';
import SplitPane from './splitPane';
import AlertContainer from 'react-alert'

class App extends Component
{
  constructor(props) {
    super(props);

    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    bus.listen('LoggedOut', this.refresh);
    bus.listen('LoggedIn', this.refresh);
    bus.listen('LanguageChanged', this.refresh);
    bus.listen('RoleChanged', this.refresh);
    bus.listen("alert", data => {
      this.msg.show(data.msg, data);
      console.log(data);
    });
  }

  render() {
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
        <AlertContainer ref={a => this.msg = a} {...alertOptions} />
        <SplitPane split="vertical" defaultSize={1}>
          <SideBar ref="sideBar"/>
          <Document ref="document"/>
        </SplitPane>
      </div>
    );

  }

  refresh() {
    this.refs.sideBar.refresh();
  }
}

export default App;