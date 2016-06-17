import { Map } from 'immutable';

import {
  MOSAIC_REQUEST,
  MOSAIC_HYDRATED,
  MOSAIC_SUCCESS,
  MOSAIC_FAILURE,
} from './actions';

export const initialState = new Map({
  isFetching: false,
  isHydrated: false,
  tracks: new Map(),
  error: null,
});

export default function mosaic(state = initialState, action) {
  switch (action.type) {
    case MOSAIC_REQUEST:
      return state.set('isFetching', true);
    case MOSAIC_HYDRATED:
      return state.set('isFetching', false);
    case MOSAIC_SUCCESS:
      return state.merge({
        tracks: action.tracks,
        isFetching: false,
        isHydrated: true,
        error: null,
      });
    case MOSAIC_FAILURE:
      return state.merge({
        isFetching: false,
        error: action.error,
      });
    default:
      return state;
  }
}
