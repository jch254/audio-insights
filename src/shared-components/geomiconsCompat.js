import React from 'react';
import PropTypes from 'prop-types';

const paths = {
  external: 'M18 6h-4V4h8v8h-2V7.4l-8.3 8.3-1.4-1.4L18.6 6H18z M6 6h6v2H8v10h10v-4h2v6H6V6z',
  pause: 'M7 5h4v14H7V5z M13 5h4v14h-4V5z',
  play: 'M7 4l12 8-12 8V4z',
};

const Icon = ({ fill, height, name, style, width }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={height}
    style={style}
    viewBox="0 0 24 24"
    width={width}
  >
    <path d={paths[name] || paths.external} fill={fill} />
  </svg>
);

Icon.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string.isRequired,
  style: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Icon.defaultProps = {
  fill: 'currentColor',
  height: 24,
  style: undefined,
  width: 24,
};

export default Icon;
