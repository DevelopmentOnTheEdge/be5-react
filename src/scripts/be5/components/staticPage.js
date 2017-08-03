import React          from 'react';
import PropTypes from 'prop-types';

class StaticPage extends React.Component {

  render() {
    let content = this.props.value;
    return <div className='staticPage' dangerouslySetInnerHTML={ {__html: content} } />;
  }

}

StaticPage.defaultProps = {
  value: ''
};

StaticPage.propTypes = {
  value: PropTypes.string.isRequired
};

export default StaticPage;