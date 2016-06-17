import { Map } from 'immutable';

export function checkStatus(response) {
  if (!response.ok) {   // (response.status < 200 || response.status > 300)
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }

  return response;
}

export function parseJSON(response) {
  return response.json();
}

export function getAlbumArtUrlForTrack(track) {
  const lowerResImageUrl = track.getIn(['album', 'images', '1', 'url']);
  const higherResImageUrl = track.getIn(['album', 'images', '0', 'url']);

  return lowerResImageUrl || (higherResImageUrl || 'https://img.jch254.com/Blank.jpg');
}

export const ID_TOKEN = 'id_token';
export const ID_TOKEN_EXPIRY = 'id_token_expiry';

export function setStoredAuthState(idToken, idTokenExpiry) {
  localStorage.setItem(ID_TOKEN, idToken);
  localStorage.setItem(ID_TOKEN_EXPIRY, idTokenExpiry);
}

export function removeStoredAuthState() {
  localStorage.removeItem(ID_TOKEN);
  localStorage.removeItem(ID_TOKEN_EXPIRY);
}

export function getStoredAuthState() {
  try {
    const idToken = localStorage.getItem(ID_TOKEN);
    const idTokenExpiry = localStorage.getItem(ID_TOKEN_EXPIRY);

    if (Date.now() > idTokenExpiry) {
      // Token has expired
      removeStoredAuthState();

      return new Map();
    }

    return new Map({ idToken });
  } catch (err) {
    removeStoredAuthState();

    return new Map();
  }
}
