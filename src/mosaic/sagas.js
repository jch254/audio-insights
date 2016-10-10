import 'isomorphic-fetch';
import { call, put, select, take } from 'redux-saga/effects';

import { MOSAIC_REQUEST, mosaicHydrated, mosaicSuccess, mosaicFailure } from './actions';
import { getIsHydrated } from './selectors';

import { selectors as appSelectors } from '../app';
import {
  fetchTopTracks,
  fetchAudioFeaturesForTracks,
  handleSpotifyApiError,
} from '../spotifyApiService';

export function* fetchMosaicSaga(idToken) {
  try {
    const isHydrated = yield select(getIsHydrated);

    if (isHydrated) {
      yield put(mosaicHydrated());
    } else {
      const currentTerm = yield select(appSelectors.getCurrentTerm);
      const { tracks } = yield call(fetchTopTracks, idToken, currentTerm);

      if (tracks.isEmpty()) {
        throw new Error('Unfortunately you do not have enough Spotify data to display the mosaic');
      }

      const trackIds = tracks.keySeq().join();
      const { audioFeaturesForTracks } = yield call(fetchAudioFeaturesForTracks, idToken, trackIds);
      const tracksWithAudioFeatures = tracks.mergeDeep(audioFeaturesForTracks);

      yield put(mosaicSuccess(tracksWithAudioFeatures.sort(() => Math.random())));
    }
  } catch (error) {
    yield call(handleSpotifyApiError, error, mosaicFailure, 'mosaic');
  }
}

export function* watchMosaicRequest() {
  while (true) {
    const { idToken } = yield take(MOSAIC_REQUEST);

    yield call(fetchMosaicSaga, idToken);
  }
}
