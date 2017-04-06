import React          from 'react';
import be5            from 'be5/be5';

const StaticPage = React.createClass({
  propTypes: {
    value: React.PropTypes.string.isRequired
  },
  
  displayName: 'StaticPage',
  
  render() {
    var content = $('<div/>').html(this.props.value);
    be5.ui.convertLinks(content);
    return React.DOM.div({ className: 'staticPage', dangerouslySetInnerHTML: { __html: content.html() } });
  }
});

be5.ui.registerDocumentType('static', function(value) {
  return (
    React.createElement(StaticPage, value)
  );
});

export default StaticPage;
