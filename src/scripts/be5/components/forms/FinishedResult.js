import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import be5 from '../../be5';
import { registerDocument } from "../../core/registers/documents";
import { _createBackAction, addUrlHandlers } from "../../utils/documentUtils";

const FinishedResult = ({ value, frontendParams }) => {
  useEffect(() => {
    addUrlHandlers($('.finishedResult'), frontendParams.documentName);
  }, [frontendParams.documentName]);

  const attributes = value.data.attributes;
  const result = attributes.operationResult;
  let message = result.message;
  
  if (result.status === 'FINISHED' && result.message === undefined) {
    message = be5.messages.successfullyCompleted;
  }

  return (
    <div className="finishedResult">
      <div dangerouslySetInnerHTML={{ __html: message }} className="mb-3" />
      {_createBackAction(attributes.layout, frontendParams)}
    </div>
  );
};

FinishedResult.propTypes = {
  value: PropTypes.shape({
    data: PropTypes.shape({
      attributes: PropTypes.object.isRequired,
      meta: PropTypes.shape({
        _ts_: PropTypes.isRequired
      })
    })
  }),
  frontendParams: PropTypes.object.isRequired
};

registerDocument('operationResult', FinishedResult);
export default FinishedResult;