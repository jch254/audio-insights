import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Flex, Box } from 'reflexbox';
import {
  PageHeader,
  Container,
  Message,
  Text,
  Stat,
  Space,
  Heading,
  Button,
  ButtonOutline,
  Overlay,
} from 'rebass';

import { recommendedTracksRequest, createRecommendedPlaylistRequest } from './actions';
import {
  getError,
  getIsCreatingPlaylist,
  getIsFetching,
  getPlaylistCreated,
  getRecommendedTracks,
  getTargetAttributes,
} from './selectors';

import FadeImage from '../components/FadeImage';
import FadeInTransition from '../components/FadeInTransition';
import FullscreenLoader from '../components/FullscreenLoader';
import { actions as appActions } from '../app';
import { selectors as authSelectors } from '../auth';

class RecommendedPage extends Component {
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
                    <ButtonOutline
                      mt={2}
                      pill
                      big
                      color="green"
                      style={{ cursor: 'default' }}
                      children="Playlist saved to Spotify"
                    /> :
                    <Button
                      mt={2}
                      pill
                      big
                      onClick={() => this.handleSaveClick(idToken)}
                      backgroundColor="green"
                      children="Save playlist to Spotify"
                    />
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
                  value={Math.round(targetAttributes.acousticness * 100)}
                />
                <Stat
                  m={2}
                  label="Danceability"
                  color="green"
                  unit="%"
                  value={Math.round(targetAttributes.danceability * 100)}
                />
                <Stat
                  m={2}
                  label="Energy"
                  color="green"
                  unit="%"
                  value={Math.round(targetAttributes.energy * 100)}
                />
                <Stat
                  m={2}
                  label="Instrumentalness"
                  color="green"
                  unit="%"
                  value={Math.round(targetAttributes.instrumentalness * 100)}
                />
                <Stat
                  m={2}
                  label="Speechiness"
                  color="green"
                  unit="%"
                  value={Math.round(targetAttributes.speechiness * 100)}
                />
                <Stat
                  m={2}
                  label="Valence"
                  color="green"
                  unit="%"
                  value={Math.round(targetAttributes.valence * 100)}
                />
              </Flex>
              {
                recommendedTracks.map((t, index) =>
                  <Flex
                    key={index}
                    align="center"
                    my={2}
                    style={{ cursor: 'pointer' }}
                    onClick={() => this.handleTrackClick(t.id)}
                  >
                    <FadeImage
                      src={t.album.images[0].url}
                      style={{
                        minWidth: '150px',
                        maxWidth: '150px',
                        minHeight: '150px',
                        maxHeight: '150px',
                        marginRight: '16px',
                      }}
                    />
                    <Box>
                      <Heading level={3} children={t.name} />
                      <Text small children={t.artists[0].name} />
                      <Text small children={t.album.name} />
                    </Box>
                    <Space auto />
                  </Flex>
                )
              }
            </Container>
          </Box>
        </FadeInTransition>
    );
  }
}

RecommendedPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  idToken: PropTypes.string.isRequired,
  recommendedTracks: PropTypes.array.isRequired,
  targetAttributes: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isCreatingPlaylist: PropTypes.bool.isRequired,
  playlistCreated: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

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
};

export default connect(mapStateToProps)(RecommendedPage);
