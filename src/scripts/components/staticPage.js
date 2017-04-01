import React          from 'react';
import be5            from 'be5';
import changeDocument from 'be5/changeDocument';
import StaticPages    from 'services/staticPages';

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
    React.createElement(StaticPage, { value: value })
  );
});

be5.registerAction('static', function(page) {
  StaticPages.load(page, changeDocument);
});

export default StaticPage;
