import 'isomorphic-fetch';
import { put } from 'redux-saga/effects';

import { actions as authActions } from './auth';
import { checkStatus, parseJSON } from './utils';

const baseUrl = 'https://api.spotify.com';

function getFetchInit(idToken, requestMethod, body) {
  const requestHeaders = new Headers();
  requestHeaders.append('Authorization', `Bearer ${idToken}`);
  requestHeaders.append('Content-Type', 'application/json');

  const fetchInit = { method: requestMethod, headers: requestHeaders };

  if (body) {
    fetchInit.body = JSON.stringify(body);
  }

  return fetchInit;
}

export function redirectToSpotifyLogin(returnPath) {
  window.location = `https://accounts.spotify.com/authorize?
client_id=${encodeURIComponent(process.env.SPOTIFY_CLIENT_ID)}&
redirect_uri=${encodeURIComponent(process.env.SPOTIFY_CALLBACK_URI)}&
scope=${encodeURIComponent(process.env.SPOTIFY_SCOPES)}&
response_type=token&state=${encodeURIComponent(returnPath)}`;
};

export function fetchUserProfile(idToken) {
  return fetch(
    `${baseUrl}/v1/me`, getFetchInit(idToken, 'GET'))
    .then(checkStatus)
    .then(parseJSON)
    .then(json => ({ userProfile: json }))
    .catch(error => Promise.reject(error));
}

export function fetchTopTracks(idToken, term) {
  return fetch(
    `${baseUrl}/v1/me/top/tracks?limit=50&time_range=${term}`, getFetchInit(idToken, 'GET'))
    .then(checkStatus)
    .then(parseJSON)
    .then(json => ({ tracks: json.items.sort(() => 0.5 - Math.random()) }))
    .catch(error => Promise.reject(error));
}

export function fetchAudioFeaturesForTracks(idToken, trackIds) {
  return fetch(`${baseUrl}/v1/audio-features/?ids=${trackIds}`, getFetchInit(idToken, 'GET'))
    .then(checkStatus)
    .then(parseJSON)
    .then(json => ({ audioFeaturesForTracks: json.audio_features }))
    .catch(error => Promise.reject(error));
}


export function fetchRecommendedTracks(idToken, targetAttributes, seedArtistIds) {
  return fetch(`${baseUrl}/v1/recommendations?
limit=100&
seed_artists=${seedArtistIds}&
target_acousticness=${targetAttributes.acousticness}&
target_danceability=${targetAttributes.danceability}&
target_energy=${targetAttributes.energy}&
target_instrumentalness=${targetAttributes.instrumentalness}&
target_speechiness=${targetAttributes.speechiness}&
target_valence=${targetAttributes.valence}`, getFetchInit(idToken, 'GET'))
    .then(checkStatus)
    .then(parseJSON)
    .then(json => ({ recommendedTracks: json.tracks.sort(() => 0.5 - Math.random()) }))
    .catch(error => Promise.reject(error));
}

export function fetchArtists(idToken, term) {
  return fetch(
    `${baseUrl}/v1/me/top/artists?limit=50&time_range=${term}`, getFetchInit(idToken, 'GET'))
    .then(checkStatus)
    .then(parseJSON)
    .then(json => ({ artists: json.items.sort(() => 0.5 - Math.random()) }))
    .catch(error => Promise.reject(error));
}

export function createPrivatePlaylist(idToken, userId, playlistName) {
  const body = { name: playlistName, public: false };

  return fetch(
    `${baseUrl}/v1/users/${userId}/playlists`, getFetchInit(idToken, 'POST', body))
    .then(checkStatus)
    .then(parseJSON)
    .then(json => ({ playlist: json }))
    .catch(error => Promise.reject(error));
}

export function addTracksToPlaylist(idToken, userId, playlistId, trackUris) {
  const body = { uris: trackUris };

  return fetch(
      `${baseUrl}/v1/users/${userId}/playlists/${playlistId}/tracks`,
      getFetchInit(idToken, 'POST', body)
    )
    .then(checkStatus)
    .then(parseJSON)
    .then(json => ({ playlist: json }))
    .catch(error => Promise.reject(error));
}

export function* handleSpotifyApiError(error, failureAction, redirectPath) {
  const response = error.response;

  if (response === undefined) {
    yield put(failureAction(error.message));
  } else {
    if (response.status === 401) {
      // Unauthorised - redirect to Spotify login
      yield put(authActions.loginRequest(redirectPath));
    } else {
      const responseError = {
        status: response.status,
        statusText: response.statusText,
        message: error.message,
      };

      yield put(failureAction(responseError));
    }
  }
}
