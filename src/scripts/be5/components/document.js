import React, {Component} from 'react';
import be5 from '../be5';
import bus from '../core/bus';

import '../../../css/document.css';

class Document extends Component {

  constructor(props) {
    super(props);

    this.state = { component: 'text', value: "Page is loading..." };
  }

  componentDidMount() {
    bus.listen('DocumentChange', data => this.setState(data));
  }

  componentWillUnmount(){
    bus.notListen('DocumentChange');
  }

  render() {
    // if (!this.state.hasOwnProperty('type')) {
    //   return React.DOM.div({className: "content"});
    // }
    //
    if(this.state.component == undefined)
    {
      return <div className="document-content">
               <h1>{this.state}</h1>
             </div>
    }

    if (this.state.component === 'text')
    {
      return <div className="document-content">
               <h1>{this.state.value}</h1>
             </div>
    }
    //
    // if (this.state.type === 'error') {
    //   return React.DOM.div({},
    //       React.DOM.h1({}, be5.messages.error + " " + this.state.value.code),
    //       this.state.value.message);
    // }
    be5.ui.setTitle(this.state.value.title);

    const DocumentContent = this.state.component;
    if(DocumentContent !== null) {
      return (
        <div className="document-content">
          <DocumentContent value={this.state.value}/>
        </div>
      )
    }
    return null;
  }

}

export default Document;
