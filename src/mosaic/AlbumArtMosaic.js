import React, { Component, PropTypes } from 'react';
import { Flex } from 'reflexbox';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import FadeImage from '../shared-components/FadeImage';
import { getAlbumArtUrlForTrack } from '../utils';

class AlbumArtMosaic extends Component {
  static propTypes = {
    tracks: ImmutablePropTypes.map.isRequired,
    windowWidth: PropTypes.number.isRequired,
    tileClickHandler: PropTypes.func,
  };

  static defaultProps = {
    windowWidth: 0,
  };

  shouldComponentUpdate(nextProps) {
    if (Immutable.is(nextProps.tracks, this.props.tracks) &&
      nextProps.windowWidth === this.props.windowWidth) {
      return false;
    }

    return true;
  }

  getColumnCount = () => {
    const { windowWidth } = this.props;
    let columns = 5;

    if (windowWidth <= 480) {
      columns = 2;
    } else if (windowWidth <= 768) {
      columns = 3;
    } else if (windowWidth <= 1024) {
      columns = 4;
    }

    return columns;
  }

  render() {
    const { tracks, tileClickHandler } = this.props;

    const columnWidth = Math.floor(100 / this.getColumnCount());
    const mosaicTiles = tracks
      .entrySeq()
      .map(([id, track]) =>
        <FadeImage
          key={id}
          src={getAlbumArtUrlForTrack(track)}
          style={{ width: `${columnWidth}%`, height: 'auto', cursor: 'pointer' }}
          onClickHandler={() => tileClickHandler(id)}
        />
    );

    return (
      <Flex
        key="mosaic"
        py={3}
        wrap
        align="center"
        justify="center"
        style={{ flex: '1 0 auto' }}
      >
        {mosaicTiles}
      </Flex>
    );
  }
};

export default AlbumArtMosaic;
