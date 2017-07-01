import React          from 'react';
import PropTypes from 'prop-types';

export default class StaticPage extends React.Component {

  render() {
    let content = this.props.value;
    return <div className='staticPage' dangerouslySetInnerHTML={ {__html: content} } />;
  }

}

StaticPage.propTypes = {
  value: PropTypes.string.isRequired
};
