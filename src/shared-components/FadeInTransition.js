import React, { PropTypes } from 'react';
import Transition from 'react-motion-ui-pack';

const FadeInTransition = ({ children }) => (
  <Transition component={false} enter={{ opacity: 1 }} leave={{ opacity: 0 }}>
    {children}
  </Transition>
);

FadeInTransition.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FadeInTransition;
