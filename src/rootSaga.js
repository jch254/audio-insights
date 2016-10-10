import { fork } from 'redux-saga/effects';

import { sagas as authSagas } from './auth';
import { sagas as mosaicSagas } from './mosaic';
import { sagas as recommendedSagas } from './recommended';
import { sagas as artistsSagas } from './artists';

export default function* rootSaga() {
  yield [
    fork(authSagas.watchLoginRequest),
    fork(authSagas.watchLoginSuccess),
    fork(authSagas.watchLoginFailure),
    fork(authSagas.watchLogout),
    fork(mosaicSagas.watchMosaicRequest),
    fork(recommendedSagas.watchRecommendedTracksRequest),
    fork(recommendedSagas.watchCreateRecommendedPlaylistRequest),
    fork(artistsSagas.watchArtistsRequest),
  ];
}
