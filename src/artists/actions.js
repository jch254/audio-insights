export const ARTISTS_REQUEST = 'ARTISTS_REQUEST';
export function artistsRequest(idToken) {
  return {
    type: ARTISTS_REQUEST,
    idToken,
  };
}

export const ARTISTS_HYDRATED = 'ARTISTS_HYDRATED';
export function artistsHydrated() {
  return {
    type: ARTISTS_HYDRATED,
  };
}

export const ARTISTS_SUCCESS = 'ARTISTS_SUCCESS';
export function artistsSuccess(artists) {
  return {
    type: ARTISTS_SUCCESS,
    artists,
  };
}

export const ARTISTS_FAILURE = 'ARTISTS_FAILURE';
export function artistsFailure(error) {
  return {
    type: ARTISTS_FAILURE,
    error,
  };
}
