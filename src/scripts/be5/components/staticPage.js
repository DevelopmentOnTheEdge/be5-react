import React          from 'react';
import be5            from 'be5/be5';
import changeDocument from 'be5/core/changeDocument';

const StaticPage = React.createClass({
  propTypes: {
    value: React.PropTypes.string.isRequired
  },
  
  displayName: 'StaticPage',
  
  render() {
    var content = this.props.value;
    be5.ui.convertLinks(content);
    return React.DOM.div({ className: 'staticPage', dangerouslySetInnerHTML: { __html: content } });
  }
});

be5.ui.registerDocumentType('static', function(value) {
  return React.createElement(StaticPage, value);
});

be5.registerAction('static', function(page) {
  be5.net.request('static/' + page, {}, data => {
    changeDocument({ type: 'static', value: data })
  });
});

export default StaticPage;
