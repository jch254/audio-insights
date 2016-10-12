import React, { PropTypes } from 'react';
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
import { bindActionCreators } from 'redux';
import functional from 'react-functional';

import RecommendedTracksList from './RecommendedTracksList';
import { recommendedTracksRequest, createRecommendedPlaylistRequest } from './actions';
import {
  getError,
  getIsCreatingPlaylist,
  getIsFetching,
  getIsPlaylistCreated,
  getRecommendedTracks,
  getTargetAttributePercentages,
} from './selectors';
import FadeInTransition from '../shared-components/FadeInTransition';
import FullscreenLoader from '../shared-components/FullscreenLoader';
import { actions as appActions } from '../app';
import { selectors as authSelectors } from '../auth';

const RecommendedPage = ({
  actions,
  idToken,
  isFetching,
  isCreatingPlaylist,
  isPlaylistCreated,
  recommendedTracks,
  targetAttributePercentages,
  error,
}) => {
  const onTrackClick = trackId => actions.openModal(trackId);

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
                  isPlaylistCreated ?
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
                      onClick={() => actions.createRecommendedPlaylistRequest(idToken)}
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
                  value={targetAttributePercentages.get('acousticness')}
                />
                <Stat
                  m={2}
                  label="Danceability"
                  color="green"
                  unit="%"
                  value={targetAttributePercentages.get('danceability')}
                />
                <Stat
                  m={2}
                  label="Energy"
                  color="green"
                  unit="%"
                  value={targetAttributePercentages.get('energy')}
                />
                <Stat
                  m={2}
                  label="Instrumentalness"
                  color="green"
                  unit="%"
                  value={targetAttributePercentages.get('instrumentalness')}
                />
                <Stat
                  m={2}
                  label="Speechiness"
                  color="green"
                  unit="%"
                  value={targetAttributePercentages.get('speechiness')}
                />
                <Stat
                  m={2}
                  label="Valence"
                  color="green"
                  unit="%"
                  value={targetAttributePercentages.get('valence')}
                />
              </Flex>
              <RecommendedTracksList
                recommendedTracks={recommendedTracks}
                onTrackClick={onTrackClick}
              />
            </Container>
          </Box>
        </FadeInTransition>
  );
};

RecommendedPage.propTypes = {
  actions: PropTypes.object.isRequired,
  idToken: PropTypes.string.isRequired,
  recommendedTracks: ImmutablePropTypes.map.isRequired,
  targetAttributePercentages: ImmutablePropTypes.map.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isCreatingPlaylist: PropTypes.bool.isRequired,
  isPlaylistCreated: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

RecommendedPage.componentDidMount = ({ actions, idToken }) => actions.recommendedTracksRequest(idToken);

const mapStateToProps = state => (
  {
    idToken: authSelectors.getIdToken(state),
    recommendedTracks: getRecommendedTracks(state),
    targetAttributePercentages: getTargetAttributePercentages(state),
    isFetching: getIsFetching(state),
    isCreatingPlaylist: getIsCreatingPlaylist(state),
    isPlaylistCreated: getIsPlaylistCreated(state),
    error: getError(state),
  }
);

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators({
      recommendedTracksRequest, createRecommendedPlaylistRequest, ...appActions }, dispatch
    ),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(functional(RecommendedPage));
