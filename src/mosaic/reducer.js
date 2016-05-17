import {
  MOSAIC_REQUEST,
  MOSAIC_HYDRATED,
  MOSAIC_SUCCESS,
  MOSAIC_FAILURE,
} from './actions';

export const initialState = {
  isFetching: false,
  isHydrated: false,
  tracks: [],
  error: null,
};

export default function mosaic(state = initialState, action) {
  switch (action.type) {
    case MOSAIC_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case MOSAIC_HYDRATED:
      return {
        ...state,
        isFetching: false,
      };
    case MOSAIC_SUCCESS:
      return {
        ...state,
        tracks: action.tracks,
        isFetching: false,
        isHydrated: true,
        error: null,
      };
    case MOSAIC_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
