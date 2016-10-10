import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Flex, Box } from 'reflexbox';
import {
  PageHeader,
  Container,
  Message,
  Stat,
  Button,
  ButtonOutline,
  Overlay,
} from 'rebass';
import ImmutablePropTypes from 'react-immutable-proptypes';

import RecommendedTracksList from './RecommendedTracksList';
import { recommendedTracksRequest, createRecommendedPlaylistRequest } from './actions';
import {
  getError,
  getIsCreatingPlaylist,
  getIsFetching,
  getPlaylistCreated,
  getRecommendedTracks,
  getTargetAttributes,
} from './selectors';

import FadeInTransition from '../shared-components/FadeInTransition';
import FullscreenLoader from '../shared-components/FullscreenLoader';
import { actions as appActions } from '../app';
import { selectors as authSelectors } from '../auth';

class RecommendedPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    idToken: PropTypes.string.isRequired,
    recommendedTracks: ImmutablePropTypes.map.isRequired,
    targetAttributes: ImmutablePropTypes.map.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isCreatingPlaylist: PropTypes.bool.isRequired,
    playlistCreated: PropTypes.bool.isRequired,
    error: PropTypes.object,
  };

  componentDidMount() {
    const { dispatch, idToken } = this.props;

    dispatch(recommendedTracksRequest(idToken));
  }

  handleTrackClick = (trackId) => {
    this.props.dispatch(appActions.openModal(trackId));
  }

  handleSaveClick = (idToken) => {
    this.props.dispatch(createRecommendedPlaylistRequest(idToken));
  }

  render() {
    const {
      idToken,
      isFetching,
      isCreatingPlaylist,
      playlistCreated,
      recommendedTracks,
      targetAttributes,
      error,
    } = this.props;

    return (
      isFetching ?
        <FullscreenLoader /> :
        <FadeInTransition>
          <Box key="recommended" style={{ flex: '1 0 auto' }}>
            <Overlay key="loading" open={isCreatingPlaylist}>
              <FullscreenLoader delay={0} />
            </Overlay>
            <Container pb={2}>
              <PageHeader
                my={2}
                py={2}
                description="Based on features of your top tracks"
                heading="Recommended"
              >
                {
                  playlistCreated ?
                    !error &&
                    <ButtonOutline
                      mt={2}
                      pill
                      big
                      color="green"
                      style={{ cursor: 'default' }}
                    >
                      Playlist saved to Spotify
                    </ButtonOutline> :
                    !error &&
                    <Button
                      mt={2}
                      pill
                      big
                      onClick={() => this.handleSaveClick(idToken)}
                      backgroundColor="green"
                    >
                      Save playlist to Spotify
                    </Button>

                }
              </PageHeader>
              {
                error &&
                <Message theme="error">
                  { `Error: ${JSON.stringify(error)}` }
                </Message>
              }
              <Flex wrap justify="space-between" pb={2} gutter={2} align="center">
                <Stat
                  m={2}
                  label="Acousticness"
                  color="green"
                  unit="%"
                  value={Math.round(targetAttributes.get('acousticness') * 100)}
                />
                <Stat
                  m={2}
                  label="Danceability"
                  color="green"
                  unit="%"
                  value={Math.round(targetAttributes.get('danceability') * 100)}
                />
                <Stat
                  m={2}
                  label="Energy"
                  color="green"
                  unit="%"
                  value={Math.round(targetAttributes.get('energy') * 100)}
                />
                <Stat
                  m={2}
                  label="Instrumentalness"
                  color="green"
                  unit="%"
                  value={Math.round(targetAttributes.get('instrumentalness') * 100)}
                />
                <Stat
                  m={2}
                  label="Speechiness"
                  color="green"
                  unit="%"
                  value={Math.round(targetAttributes.get('speechiness') * 100)}
                />
                <Stat
                  m={2}
                  label="Valence"
                  color="green"
                  unit="%"
                  value={Math.round(targetAttributes.get('valence') * 100)}
                />
              </Flex>
              <RecommendedTracksList
                recommendedTracks={recommendedTracks}
                trackClickHandler={this.handleTrackClick}
              />
            </Container>
          </Box>
        </FadeInTransition>
    );
  }
}

function mapStateToProps(state) {
  return {
    idToken: authSelectors.getIdToken(state),
    recommendedTracks: getRecommendedTracks(state),
    targetAttributes: getTargetAttributes(state),
    isFetching: getIsFetching(state),
    isCreatingPlaylist: getIsCreatingPlaylist(state),
    playlistCreated: getPlaylistCreated(state),
    error: getError(state),
  };
}

export default connect(mapStateToProps)(RecommendedPage);
