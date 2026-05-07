import { Map } from 'immutable';

export const getAlbumArtUrlForTrack = (track) => {
  const lowerResImageUrl = track.getIn(['album', 'images', '1', 'url']);
  const higherResImageUrl = track.getIn(['album', 'images', '0', 'url']);

  return lowerResImageUrl || higherResImageUrl || 'https://img.jch254.com/Blank.jpg';
};

const ID_TOKEN = 'id_token';

const ID_TOKEN_EXPIRY = 'id_token_expiry';

export const setStoredAuthState = (idToken, idTokenExpiry) => {
  localStorage.setItem(ID_TOKEN, idToken);
  localStorage.setItem(ID_TOKEN_EXPIRY, idTokenExpiry);
};

export const removeStoredAuthState = () => {
  localStorage.removeItem(ID_TOKEN);
  localStorage.removeItem(ID_TOKEN_EXPIRY);
};

export const getStoredAuthState = () => {
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
};

const PKCE_VERIFIER = 'pkce_verifier';

const base64UrlEncode = bytes =>
  btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

export const generatePkceVerifier = () => {
  const bytes = new Uint8Array(32);
  window.crypto.getRandomValues(bytes);
  return base64UrlEncode(bytes);
};

export const generatePkceChallenge = async (verifier) => {
  const data = new TextEncoder().encode(verifier);
  const hash = await window.crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(new Uint8Array(hash));
};

export const setStoredPkceVerifier = verifier =>
  sessionStorage.setItem(PKCE_VERIFIER, verifier);

export const getStoredPkceVerifier = () => sessionStorage.getItem(PKCE_VERIFIER);

export const removeStoredPkceVerifier = () => sessionStorage.removeItem(PKCE_VERIFIER);
