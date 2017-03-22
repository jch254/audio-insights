import React, { PropTypes } from 'react';
import Loading from 'react-loading';
import { Flex } from 'reflexbox';

const FullscreenLoader = ({ delay = 1000 }) => (
  <Flex key="loader" align="center" justify="center" style={{ flex: '1 0 auto' }} >
    <Loading delay={delay} type="spinningBubbles" color="#888" />
  </Flex>
);

FullscreenLoader.propTypes = {
  delay: PropTypes.number,
};

FullscreenLoader.defaultProps = {
  delay: null,
};

export default FullscreenLoader;
