import React from 'react';
import PropTypes from 'prop-types';

const FadeInTransition = ({ children }) => (
  <>{children}</>
);

FadeInTransition.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FadeInTransition;
