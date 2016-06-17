import { Map } from 'immutable';

import {
  ARTISTS_REQUEST,
  ARTISTS_HYDRATED,
  ARTISTS_SUCCESS,
  ARTISTS_FAILURE,
} from './actions';

export const initialState = new Map({
  isFetching: false,
  isHydrated: false,
  artists: new Map(),
  error: null,
});

export default function artists(state = initialState, action) {
  switch (action.type) {
    case ARTISTS_REQUEST:
      return state.set('isFetching', true);
    case ARTISTS_HYDRATED:
      return state.set('isFetching', false);
    case ARTISTS_SUCCESS:
      return state.merge({
        artists: action.artists,
        isFetching: false,
        isHydrated: true,
        error: null,
      });
    case ARTISTS_FAILURE:
      return state.merge({
        isFetching: false,
        error: action.error,
      });
    default:
      return state;
  }
}
