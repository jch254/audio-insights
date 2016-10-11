import React, { Component, PropTypes } from 'react';
import Icon from 'react-geomicons';
import { ButtonCircle } from 'rebass';

class PlayPause extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
    };
  }

  handleClick = () => {
    const isPlaying = this.state.playing;

    if (isPlaying) {
      this.preview.pause();
    } else {
      this.preview.play();
    }

    this.setState({ playing: !isPlaying });
  }

  previewEnded = () => {
    this.setState({ playing: false });
  }

  render() {
    return (
      <ButtonCircle
        size={48}
        title="Play"
        backgroundColor="green"
        onClick={this.handleClick}
      >
        <Icon
          fill="white"
          height="32px"
          name={this.state.playing ? 'pause' : 'play'}
          width="32px"
          style={{ marginLeft: this.state.playing ? '0px' : '4px' }}
        />
        <audio
          ref={component => (this.preview = component)}
          src={this.props.previewUrl}
          type="audio/mpeg"
          onEnded={this.previewEnded}
        />
      </ButtonCircle>
    );
  }
}

PlayPause.propTypes = {
  previewUrl: PropTypes.string.isRequired,
};

export default PlayPause;
