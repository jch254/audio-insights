export const RECOMMENDED_TRACKS_REQUEST = 'RECOMMENDED_TRACKS_REQUEST';
export function recommendedTracksRequest(idToken) {
  return {
    type: RECOMMENDED_TRACKS_REQUEST,
    idToken,
  };
}

export const RECOMMENDED_TRACKS_HYDRATED = 'RECOMMENDED_TRACKS_HYDRATED';
export function recommendedTracksHydrated() {
  return {
    type: RECOMMENDED_TRACKS_HYDRATED,
  };
}

export const RECOMMENDED_TRACKS_SUCCESS = 'RECOMMENDED_TRACKS_SUCCESS';
export function recommendedTracksSuccess(recommendedTracks, targetAttributes) {
  return {
    type: RECOMMENDED_TRACKS_SUCCESS,
    recommendedTracks,
    targetAttributes,
  };
}

export const RECOMMENDED_TRACKS_FAILURE = 'RECOMMENDED_TRACKS_FAILURE';
export function recommendedTracksFailure(error) {
  return {
    type: RECOMMENDED_TRACKS_FAILURE,
    error,
  };
}

export const CREATE_RECOMMENDED_PLAYLIST_REQUEST = 'CREATE_RECOMMENDED_PLAYLIST_REQUEST';
export function createRecommendedPlaylistRequest(idToken) {
  return {
    type: CREATE_RECOMMENDED_PLAYLIST_REQUEST,
    idToken,
  };
}

export const CREATE_RECOMMENDED_PLAYLIST_SUCCESS = 'CREATE_RECOMMENDED_PLAYLIST_SUCCESS';
export function createRecommendedPlaylistSuccess() {
  return {
    type: CREATE_RECOMMENDED_PLAYLIST_SUCCESS,
  };
}

export const CREATE_RECOMMENDED_PLAYLIST_FAILURE = 'CREATE_RECOMMENDED_PLAYLIST_FAILURE';
export function createRecommendedPlaylistFailure(error) {
  return {
    type: CREATE_RECOMMENDED_PLAYLIST_FAILURE,
    error,
  };
}
