import React from 'react';
import be5 from 'be5/be5';
import bus from 'be5/core/bus';

be5.load.css('be5/css/document.css');

export default React.createClass({
  displayName: 'Document',
  
  getInitialState() {
    return { type: 'loading', value: be5.messages.loading };
  },
  
  render() {
    if (!this.state.hasOwnProperty('type')) {
      return React.DOM.div({className: "content"});
    }
    
    if (this.state.type === 'loading') {
      return React.DOM.div({className: 'content'},
          React.DOM.h1({className: 'text-center'}, this.state.value));
    }
    
    if (this.state.type === 'error') {
      return React.DOM.div({}, 
          React.DOM.h1({}, be5.messages.error + " " + this.state.value.code),
          this.state.value.message);
    }
    be5.ui.setTitle(this.state.value.title);
    if (this.state.type in be5.ui.documentTypes) {
      return React.DOM.div({className: "content"}, be5.ui.createDocument(this.state.type, this.state.value));
    } else {
      return (
        React.DOM.div({className: "content"}, "Unknown content type \"" + this.state.type + "\".", JSON.stringify(this.state.value))
      );
    }
  },
  
  // this should occur only once
  componentDidMount() {
    bus.listen('DocumentChange', data => this.replaceState(data));
  }
});
