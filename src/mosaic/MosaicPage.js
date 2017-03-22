import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Box } from 'reflexbox';
import {
  Message,
} from 'rebass';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';
import functional from 'react-functional';

import AlbumArtMosaic from './AlbumArtMosaic';
import { mosaicRequest } from './actions';
import { getError, getIsFetching, getTracks } from './selectors';
import FadeInTransition from '../shared-components/FadeInTransition';
import FullscreenLoader from '../shared-components/FullscreenLoader';
import WindowDimensionsWrapper from '../shared-components/WindowDimensionsWrapper';
import { selectors as authSelectors } from '../auth';
import { actions as appActions } from '../app';

const MosaicPage = ({ isFetching, tracks, error, actions }) => {
  const onTileClick = trackId => actions.openModal(trackId);

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
            <AlbumArtMosaic tracks={tracks} onTileClick={onTileClick} />
          </WindowDimensionsWrapper>
        </Box>
      </FadeInTransition>
  );
};

MosaicPage.propTypes = {
  actions: PropTypes.object.isRequired,
  tracks: ImmutablePropTypes.map.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

MosaicPage.defaultProps = {
  error: null,
};

MosaicPage.componentDidMount = ({ actions, idToken }) => actions.mosaicRequest(idToken);

const mapStateToProps = state => (
  {
    idToken: authSelectors.getIdToken(state),
    tracks: getTracks(state),
    isFetching: getIsFetching(state),
    error: getError(state),
  }
);

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators({ mosaicRequest, ...appActions }, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(functional(MosaicPage));
