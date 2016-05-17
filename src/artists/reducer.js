import {
  ARTISTS_REQUEST,
  ARTISTS_HYDRATED,
  ARTISTS_SUCCESS,
  ARTISTS_FAILURE,
} from './actions';

export const initialState = {
  isFetching: false,
  isHydrated: false,
  artists: [],
  error: null,
};

export default function artists(state = initialState, action) {
  switch (action.type) {
    case ARTISTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ARTISTS_HYDRATED:
      return {
        ...state,
        isFetching: false,
      };
    case ARTISTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isHydrated: true,
        artists: action.artists,
        error: null,
      };
    case ARTISTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
