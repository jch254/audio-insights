export const MOSAIC_REQUEST = 'MOSAIC_REQUEST';
export function mosaicRequest(idToken) {
  return {
    type: MOSAIC_REQUEST,
    idToken,
  };
}

export const MOSAIC_HYDRATED = 'MOSAIC_HYDRATED';
export function mosaicHydrated() {
  return {
    type: MOSAIC_HYDRATED,
  };
}

export const MOSAIC_SUCCESS = 'MOSAIC_SUCCESS';
export function mosaicSuccess(tracks) {
  return {
    type: MOSAIC_SUCCESS,
    tracks,
  };
}

export const MOSAIC_FAILURE = 'MOSAIC_FAILURE';
export function mosaicFailure(error) {
  return {
    type: MOSAIC_FAILURE,
    error,
  };
}
