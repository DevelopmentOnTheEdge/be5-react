import React, { Component } from 'react';

import Header from "./template/header";


class App extends Component
{
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {

    return (
      <div>
        <Header/>
      </div>
    );

  }

  refresh() {
    this.refs.sideBar.refresh();
  }
}

export default App;