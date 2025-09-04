import React, { useState } from 'react';
import PropTypes from 'prop-types';
import be5 from '../be5';
import { Button, Card, CardBody, Collapse } from 'reactstrap';
import { registerDocument } from "../core/registers/documents";

const Error = ({ status, title, code, detail }) => {
  const [helpCollapse, setHelpCollapse] = useState(false);

  const toggleHelpCollapse = () => {
    setHelpCollapse(prev => !prev);
  };

  const renderFrontendHelp = () => {
    if (status === '404' || status === '403') {
      const link =
        status === '404' ? (
         <div> 
          <a href="#!" className="btn btn-primary">
            {be5.messages.goToHomepage}
          </a>
         </div> 
        ) : (
         <div> 
          <a href="/" className="btn btn-primary">
            {be5.messages.goToHomepage}
          </a>
         </div> 
        );

      return (
        <div>
          <br />
          <h6>{link}</h6>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="errorPane__error">
      <h1 className={`errorPane__title errorPane__title_${status}`}>
        {status} - {title}
      </h1>
      {renderFrontendHelp()}
      <br />
      {code !== undefined && (
        <pre
          className="errorPane__code"
          dangerouslySetInnerHTML={{ __html: code }}
        />
      )}
      {detail !== undefined && (
        <div>
          <Button
            color="info"
            className="btn-sm"
            onClick={toggleHelpCollapse}
            style={{ marginBottom: '1rem' }}
          >
            {be5.messages.details}
          </Button>
          <Collapse isOpen={helpCollapse}>
            <Card>
              <CardBody>
                <pre className="errorPane__detail">{detail}</pre>
              </CardBody>
            </Card>
          </Collapse>
        </div>
      )}
    </div>
  );
};

Error.propTypes = {
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  code: PropTypes.string,
  detail: PropTypes.string,
};

const ErrorPane = ({ value }) => {
  const errors = value?.errors;

  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <div className="errorPane">
      {errors.map((error, i) => (
        <Error {...error} key={i} />
      ))}
    </div>
  );
};

ErrorPane.propTypes = {
  value: PropTypes.shape({
    errors: PropTypes.array.isRequired,
    meta: PropTypes.shape({
      _ts_: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    }),
  }),
};

registerDocument("errorPane", ErrorPane);

export default ErrorPane;
