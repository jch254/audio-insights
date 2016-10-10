import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Box } from 'reflexbox';
import {
  Message,
} from 'rebass';
import ImmutablePropTypes from 'react-immutable-proptypes';

import AlbumArtMosaic from './AlbumArtMosaic';
import { mosaicRequest } from './actions';
import { getError, getIsFetching, getTracks } from './selectors';

import FadeInTransition from '../shared-components/FadeInTransition';
import FullscreenLoader from '../shared-components/FullscreenLoader';
import WindowDimensionsWrapper from '../shared-components/WindowDimensionsWrapper';
import { selectors as authSelectors } from '../auth';
import { actions as appActions } from '../app';

class MosaicPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    idToken: PropTypes.string.isRequired,
    tracks: ImmutablePropTypes.map.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.object,
  };

  componentDidMount() {
    const { dispatch, idToken } = this.props;
    dispatch(mosaicRequest(idToken));
  }

  handleTileClick = (trackId) => {
    this.props.dispatch(appActions.openModal(trackId));
  }

  render() {
    const { isFetching, tracks, error } = this.props;

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
              <AlbumArtMosaic tracks={tracks} tileClickHandler={this.handleTileClick} />
            </WindowDimensionsWrapper>
          </Box>
        </FadeInTransition>
    );
  }
}

function mapStateToProps(state) {
  return {
    idToken: authSelectors.getIdToken(state),
    tracks: getTracks(state),
    isFetching: getIsFetching(state),
    error: getError(state),
  };
}

export default connect(mapStateToProps)(MosaicPage);
