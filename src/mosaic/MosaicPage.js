import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box } from 'reflexbox';
import {
  Message,
} from 'rebass';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';

import AlbumArtMosaic from './AlbumArtMosaic';
import { mosaicRequest } from './actions';
import { getError, getIsFetching, getTracks } from './selectors';
import FadeInTransition from '../shared-components/FadeInTransition';
import FullscreenLoader from '../shared-components/FullscreenLoader';
import WindowDimensionsWrapper from '../shared-components/WindowDimensionsWrapper';
import { selectors as authSelectors } from '../auth';
import { actions as appActions } from '../app';

class MosaicPage extends React.Component {
  componentDidMount() {
    const { actions, idToken } = this.props;

    actions.mosaicRequest(idToken);
  }

  render() {
    const { isFetching, tracks, error, actions } = this.props;
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
  }
}

MosaicPage.propTypes = {
  actions: PropTypes.object.isRequired,
  idToken: PropTypes.string.isRequired,
  tracks: ImmutablePropTypes.map.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

MosaicPage.defaultProps = {
  error: null,
};

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

export default connect(mapStateToProps, mapDispatchToProps)(MosaicPage);
