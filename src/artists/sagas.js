import 'isomorphic-fetch';
import { call, put, select, take } from 'redux-saga/effects';

import {
  ARTISTS_REQUEST,
  artistsHydrated,
  artistsSuccess,
  artistsFailure,
} from './actions';
import { getIsHydrated } from './selectors';

import { selectors as appSelectors } from '../app';
import { fetchArtists, handleSpotifyApiError } from '../spotifyApiService';

export function* fetchArtistsSaga(idToken) {
  try {
    const isHydrated = yield select(getIsHydrated);

    if (isHydrated) {
      yield put(artistsHydrated());
    } else {
      const currentTerm = yield select(appSelectors.getCurrentTerm);
      const { artists } = yield call(fetchArtists, idToken, currentTerm);

      if (artists.length === 0) {
        throw new Error('Unfortunately you do not have enough Spotify data to display top artists');
      }

      yield put(artistsSuccess(artists));
    }
  } catch (error) {
    yield call(handleSpotifyApiError, error, artistsFailure, 'artists');
  }
}

export function* watchArtistsRequest() {
  while (true) {
    const { idToken } = yield take(ARTISTS_REQUEST)

    yield call(fetchArtistsSaga, idToken);
  }
}
