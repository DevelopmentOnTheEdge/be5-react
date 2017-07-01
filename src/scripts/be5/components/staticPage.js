import React          from 'react';
import PropTypes from 'prop-types';
import be5            from '../be5';

export default class StaticPage extends React.Component {

  render() {
    let content = this.props.value;
    be5.ui.convertLinks(content);
    return <div className='staticPage' dangerouslySetInnerHTML={ {__html: content} } />;
  }

}

StaticPage.propTypes = {
  value: PropTypes.string.isRequired
};
