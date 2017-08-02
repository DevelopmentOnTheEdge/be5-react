import React from 'react';
import be5 from '../be5';

const CustomServlet = React.createClass({
  displayName: 'CustomServlet',
  
  render() {
    var content = $('<div/>').html(this.props.content);
    be5.ui.convertLinks(content);
    return React.DOM.div({className: "content", dangerouslySetInnerHTML: {__html: content.html()}});
  }
});

//be5.ui.registerDocumentType('servlet', function(value) {
//  return (
//    React.createElement(CustomServlet, {content: value})
//  );
//});

export default CustomServlet;
