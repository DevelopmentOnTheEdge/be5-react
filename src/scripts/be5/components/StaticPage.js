import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { registerDocument } from '../core/registers/documents';
import { addUrlHandlers } from "../utils/documentUtils";

const StaticPage = (props) => {
  const { value, frontendParams } = props;

  useEffect(() => {
    addUrlHandlers($('.staticPage'), frontendParams.documentName);
  }, [frontendParams.documentName]);

  if (!value) return null;

  const { attributes } = value.data;
  const title = attributes.title ? (<h1 className='staticPage__title'>{attributes.title}</h1>) : null;

  return (
    <div className='staticPage'>
      {title}
      <div className='staticPage__text' dangerouslySetInnerHTML={{ __html: attributes.content }} />
    </div>
  );
};

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
