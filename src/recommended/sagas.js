import 'isomorphic-fetch';
import { call, put, select, take } from 'redux-saga/effects';

import {
  RECOMMENDED_TRACKS_REQUEST,
  recommendedTracksHydrated,
  recommendedTracksSuccess,
  recommendedTracksFailure,
  CREATE_RECOMMENDED_PLAYLIST_REQUEST,
  createRecommendedPlaylistSuccess,
  createRecommendedPlaylistFailure,
} from './actions';
import { getIsHydrated, getRecommendedTracks } from './selectors';

import { selectors as appSelectors } from '../app';
import {
  sagas as mosaicSagas,
  selectors as mosaicSelectors,
} from '../mosaic';
import {
  fetchAudioFeaturesForTracks,
  fetchRecommendedTracks,
  fetchUserProfile,
  createPrivatePlaylist,
  addTracksToPlaylist,
  handleSpotifyApiError,
} from '../spotifyApiService';

export function* fetchRecommendedTracksSaga(idToken) {
  try {
    const isHydrated = yield select(getIsHydrated);

    if (isHydrated) {
      yield put(recommendedTracksHydrated());
    } else {
      yield call(mosaicSagas.fetchMosaicSaga, idToken);

      const tracks = yield select(mosaicSelectors.getTracks);
      const seedArtistIds = getSeedArtistIds(tracks);
      const targetAttributes = {
        acousticness: getAverageAudioFeature(tracks, t => t.acousticness),
        danceability: getAverageAudioFeature(tracks, t => t.danceability),
        energy: getAverageAudioFeature(tracks, t => t.energy),
        instrumentalness: getAverageAudioFeature(tracks, t => t.instrumentalness),
        speechiness: getAverageAudioFeature(tracks, t => t.speechiness),
        valence: getAverageAudioFeature(tracks, t => t.valence),
      }
      const { recommendedTracks } =
        yield call(fetchRecommendedTracks, idToken, targetAttributes, seedArtistIds);

      const uniqueTrackIds = [...new Set(recommendedTracks.map(t => (t.id)))];
      const recommendedTrackIds = uniqueTrackIds.join(',');
      const { audioFeaturesForTracks } =
        yield call(fetchAudioFeaturesForTracks, idToken, recommendedTrackIds);

      const tracksWithAudioFeatures = [];
      for (const [index, audioFeaturesForTrack] of audioFeaturesForTracks.entries()) {
        const recommendedTrack =
          recommendedTracks.find(t => t.id === audioFeaturesForTrack.id);

        tracksWithAudioFeatures[index] = { ...recommendedTrack, ...audioFeaturesForTrack };
      }

      yield put(recommendedTracksSuccess(tracksWithAudioFeatures, targetAttributes));
    }
  } catch (error) {
    yield call(handleSpotifyApiError, error, recommendedTracksFailure, 'recommended');
  }
}

export function* watchRecommendedTracksRequest() {
  while (true) {
    const { idToken } = yield take(RECOMMENDED_TRACKS_REQUEST)

    yield call(fetchRecommendedTracksSaga, idToken);
  }
}

export function* createRecommendedPlaylistSaga(idToken) {
  try {
    const recommendedTracks = yield select(getRecommendedTracks);
    const recommendedTrackUris = recommendedTracks.map(t => t.uri);
    const { userProfile } = yield call(fetchUserProfile, idToken);
    const currentTerm = yield select(appSelectors.getCurrentTerm);
    const playlistName = `AI Recommended (${currentTerm})`;
    const { playlist } = yield call(createPrivatePlaylist, idToken, userProfile.id, playlistName);

    yield call(addTracksToPlaylist, idToken, userProfile.id, playlist.id, recommendedTrackUris)
    yield put(createRecommendedPlaylistSuccess());
  } catch (error) {
    yield call(handleSpotifyApiError, error, createRecommendedPlaylistFailure, 'recommended');
  }
}

export function* watchCreateRecommendedPlaylistRequest() {
  while (true) {
    const { idToken } = yield take(CREATE_RECOMMENDED_PLAYLIST_REQUEST)

    yield call(createRecommendedPlaylistSaga, idToken);
  }
}

function getAverageAudioFeature(tracks, featureSelector) {
  return tracks.map(featureSelector).reduce((a, b) => a + b, 0) / tracks.length;
}

function getSeedArtistIds(tracks) {
  // TODO: Improve function

  const allArtistIds = tracks
    .map(t => t.artists)
    .reduce((a, b) => a.concat(b)) // Flatten artists
    .map(a => a.id); // Grab artistIds

  return [...new Set(allArtistIds)]
    .map(a => [a, allArtistIds.filter(y => y === a).length]) // Calculate frequency of each artistId
    .sort((a, b) => b[1] - a[1]) // Sort by artistId frequency
    .map(a => a[0])
    .slice(0, 5) // Grab top five most frequent artistIds
    .join(',');
}
