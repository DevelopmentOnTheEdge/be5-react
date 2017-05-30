import React          from 'react';
import PropTypes from 'prop-types';
import be5            from 'be5/be5';
import changeDocument from 'be5/core/changeDocument';

class StaticPage extends React.Component {

  render() {
    var content = this.props.value;
    be5.ui.convertLinks(content);
    return React.DOM.div({ className: 'staticPage', dangerouslySetInnerHTML: { __html: content } });
  }

}

StaticPage.propTypes = {
  value: PropTypes.string.isRequired
};

be5.ui.registerDocumentType('static', function(value) {
  return React.createElement(StaticPage, value);
});

be5.registerAction('static', function(page) {
  be5.net.request('static/' + page, {}, data => {
    changeDocument({ type: 'static', value: data })
  });
});

export default StaticPage;
