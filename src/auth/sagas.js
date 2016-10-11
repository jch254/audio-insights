import 'isomorphic-fetch';
import { take } from 'redux-saga/effects';

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './actions';
import { redirectToSpotifyLogin } from '../spotifyApiService';
import { setStoredAuthState, removeStoredAuthState } from '../utils';

export function* watchLoginRequest() {
  while (true) {
    const { returnPath } = yield take(LOGIN_REQUEST);

    redirectToSpotifyLogin(returnPath);
  }
}

export function* watchLoginSuccess() {
  while (true) {
    const { idToken, idTokenExpiry } = yield take(LOGIN_SUCCESS);

    setStoredAuthState(idToken, idTokenExpiry);
  }
}

export function* watchLoginFailure() {
  while (true) {
    yield take(LOGIN_FAILURE);

    removeStoredAuthState();
  }
}

export function* watchLogout() {
  while (true) {
    yield take(LOGOUT);

    removeStoredAuthState();
  }
}
