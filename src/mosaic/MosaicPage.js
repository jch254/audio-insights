import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Box } from 'reflexbox';
import {
  Message,
} from 'rebass'

import Mosaic from './Mosaic';
import { mosaicRequest } from './actions';
import { getError, getIsFetching, getTracks } from './selectors';

import FadeInTransition from '../components/FadeInTransition';
import FullscreenLoader from '../components/FullscreenLoader';
import WindowDimensionsWrapper from '../components/WindowDimensionsWrapper';
import { selectors as authSelectors } from '../auth';
import { actions as appActions } from '../app';
import { getAlbumArtUrlForTrack } from '../utils';

class MosaicPage extends Component {
  componentDidMount() {
    const { dispatch, idToken } = this.props;
    dispatch(mosaicRequest(idToken));
  }

  handleTileClick = (trackId) => {
    this.props.dispatch(appActions.openModal(trackId));
  }

  render() {
    const { isFetching, tracks, error } = this.props;
    const albumArtTiles = tracks.map(t => ({
      url: `${getAlbumArtUrlForTrack(t)}?${new Date().getTime()}`,
      onClickHandler: () => this.handleTileClick(t.id),
    }));

    return (
      isFetching ?
        <FullscreenLoader /> :
        <FadeInTransition>
          <Box key="mosaic" style={{ flex: '1 0 auto' }} >
            {
              error &&
              <Message theme="error">
                { `Error: ${JSON.stringify(error)}` }
              </Message>
            }
            <WindowDimensionsWrapper>
              <Mosaic tilesArray={albumArtTiles} />
            </WindowDimensionsWrapper>
          </Box>
        </FadeInTransition>
    );
  }
}

MosaicPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  idToken: PropTypes.string.isRequired,
  tracks: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    idToken: authSelectors.getIdToken(state),
    tracks: getTracks(state),
    isFetching: getIsFetching(state),
    error: getError(state),
  };
};

export default connect(mapStateToProps)(MosaicPage);
