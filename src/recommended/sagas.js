import 'isomorphic-fetch';
import { Map } from 'immutable';
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

const getAverageAudioFeature = (tracks, featureSelector) =>
  tracks.map(featureSelector).reduce((a, b) => a + b, 0) / tracks.count();

const getCommaSeparatedSeedArtistIds = tracks =>
  tracks
    .valueSeq()
    .flatMap(t => t.get('artists'))
    .groupBy(a => a.get('id'))
    .sort((a, b) => b.size - a.size)
    .take(5)
    .keySeq()
    .join();

export function* fetchRecommendedTracksSaga(idToken) {
  try {
    const isHydrated = yield select(getIsHydrated);

    if (isHydrated) {
      yield put(recommendedTracksHydrated());
    } else {
      yield call(mosaicSagas.fetchMosaicSaga, idToken);

      const tracks = yield select(mosaicSelectors.getTracks);

      if (tracks.isEmpty()) {
        throw new Error(
          'Unfortunately you do not have enough Spotify data to generate a recommended playlist');
      }

      const seedArtistIds = getCommaSeparatedSeedArtistIds(tracks);
      const targetAttributes = new Map({
        acousticness: getAverageAudioFeature(tracks, t => t.get('acousticness')),
        danceability: getAverageAudioFeature(tracks, t => t.get('danceability')),
        energy: getAverageAudioFeature(tracks, t => t.get('energy')),
        instrumentalness: getAverageAudioFeature(tracks, t => t.get('instrumentalness')),
        speechiness: getAverageAudioFeature(tracks, t => t.get('speechiness')),
        valence: getAverageAudioFeature(tracks, t => t.get('valence')),
      });

      const { recommendedTracks } =
        yield call(fetchRecommendedTracks, idToken, targetAttributes, seedArtistIds);

      const recommendedTrackIds = recommendedTracks.keySeq().toSet().join();
      const { audioFeaturesForTracks } =
        yield call(fetchAudioFeaturesForTracks, idToken, recommendedTrackIds);
      const tracksWithAudioFeatures = recommendedTracks.mergeDeep(audioFeaturesForTracks);

      yield put(recommendedTracksSuccess(
        tracksWithAudioFeatures.sort(() => Math.random()), targetAttributes));
    }
  } catch (error) {
    yield call(handleSpotifyApiError, error, recommendedTracksFailure, 'recommended');
  }
}

export function* watchRecommendedTracksRequest() {
  while (true) {
    const { idToken } = yield take(RECOMMENDED_TRACKS_REQUEST);

    yield call(fetchRecommendedTracksSaga, idToken);
  }
}

export function* createRecommendedPlaylistSaga(idToken) {
  try {
    const recommendedTracks = yield select(getRecommendedTracks);
    const recommendedTrackUris = recommendedTracks.map(track => track.get('uri')).join();
    const { userProfile } = yield call(fetchUserProfile, idToken);
    const currentTerm = yield select(appSelectors.getCurrentTerm);
    const playlistName = `AI Recommended (${currentTerm})`;
    const { playlist } =
      yield call(createPrivatePlaylist, idToken, userProfile.get('id'), playlistName);
    yield call(
      addTracksToPlaylist, idToken, userProfile.get('id'), playlist.get('id'), recommendedTrackUris
    );
    yield put(createRecommendedPlaylistSuccess());
  } catch (error) {
    yield call(handleSpotifyApiError, error, createRecommendedPlaylistFailure, 'recommended');
  }
}

export function* watchCreateRecommendedPlaylistRequest() {
  while (true) {
    const { idToken } = yield take(CREATE_RECOMMENDED_PLAYLIST_REQUEST);

    yield call(createRecommendedPlaylistSaga, idToken);
  }
}
