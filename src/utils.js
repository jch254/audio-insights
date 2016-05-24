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
  if (track.album.images[1]) {
    return track.album.images[1].url;
  } else if (track.album.images[0]) {
    return track.album.images[0].url;
  }

  return 'https://img.jch254.com/Blank.jpg';
}

export const ID_TOKEN = 'id_token';
export const ID_TOKEN_EXPIRY = 'id_token_expiry';

export function setStoredAuthData(idToken, idTokenExpiry) {
  localStorage.setItem(ID_TOKEN, idToken);
  localStorage.setItem(ID_TOKEN_EXPIRY, idTokenExpiry);
}

export function removeStoredAuthData() {
  localStorage.removeItem(ID_TOKEN);
  localStorage.removeItem(ID_TOKEN_EXPIRY);
}

export function getStoredAuthData() {
  try {
    const idToken = localStorage.getItem(ID_TOKEN);
    const idTokenExpiry = localStorage.getItem(ID_TOKEN_EXPIRY);

    if (Date.now() > idTokenExpiry) {
      // Token has expired
      removeStoredAuthData();
      return {};
    }
    return { idToken };
  } catch (err) {
    removeStoredAuthData();
    return {};
  }
}
