import React, { Component, PropTypes } from 'react';
import { Motion, spring } from 'react-motion';

class FadeImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    };
  }

  handleImageLoad = () => {
    this.setState({ loaded: true });
  }

  render() {
    const { src, onClickHandler, style = {} } = this.props;

    return (
      <Motion
        defaultStyle={{ opacity: 0 }}
        style={{ opacity: spring(this.state.loaded ? 1 : 0) }}
      >
        { interpolatedStyle =>
          <img
            alt="Fade"
            src={src}
            style={{
              ...style,
              opacity: interpolatedStyle.opacity,
            }}
            onClick={onClickHandler}
            onLoad={this.handleImageLoad}
          />
          }
      </Motion>
    );
  }
}

FadeImage.propTypes = {
  src: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func,
  style: PropTypes.object,
};

FadeImage.defaultProps = {
  onClickHandler: null,
  style: null,
};

export default FadeImage;
