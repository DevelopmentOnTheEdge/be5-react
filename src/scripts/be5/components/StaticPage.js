import React from 'react';
import PropTypes from 'prop-types';
import {registerDocument} from '../core/registers/documents';
import {addUrlHandlers} from "../utils/documentUtils";


class StaticPage extends React.Component {
  componentDidMount() {
    addUrlHandlers($('.staticPage'), this.props.frontendParams.documentName);
  }

  render() {
    if (!this.props.value) return null;
    const attributes = this.props.value.data.attributes;
    const title = attributes.title ? (<h1 className='staticPage__title'>{attributes.title}</h1>) : null;

    return (
      <div className='staticPage'>
        {title}
        <div className='staticPage__text' dangerouslySetInnerHTML={{__html: attributes.content}}/>
      </div>
    );
  }
}

StaticPage.propTypes = {
  value: PropTypes.shape({
    data: PropTypes.shape({
      attributes: PropTypes.shape({
        title: PropTypes.string,
        content: PropTypes.string,
      }),
      meta: PropTypes.shape({
        _ts_: PropTypes.isRequired,
      })
    })
  }),
};

registerDocument("static", StaticPage);

export default StaticPage;
