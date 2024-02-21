import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    orientation: PropTypes.oneOf(['horizontal', 'vertical'])
  };

const LayoutContainer = props => {
    return <div className={props.orientation} {...props}>
    </div>;
}

LayoutContainer.propTypes = propTypes;

LayoutContainer.defaultProps = {
  orientation: "horizontal"
};


export default LayoutContainer