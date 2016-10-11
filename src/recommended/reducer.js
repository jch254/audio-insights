import { Map } from 'immutable';

import {
  RECOMMENDED_TRACKS_REQUEST,
  RECOMMENDED_TRACKS_HYDRATED,
  RECOMMENDED_TRACKS_SUCCESS,
  RECOMMENDED_TRACKS_FAILURE,
  CREATE_RECOMMENDED_PLAYLIST_REQUEST,
  CREATE_RECOMMENDED_PLAYLIST_SUCCESS,
  CREATE_RECOMMENDED_PLAYLIST_FAILURE,
} from './actions';

export const initialState = new Map({
  isFetching: false,
  isCreatingPlaylist: false,
  isPlaylistCreated: false,
  isHydrated: false,
  recommendedTracks: new Map(),
  targetAttributes: new Map(),
  error: null,
});

export default function recommended(state = initialState, action) {
  switch (action.type) {
    case RECOMMENDED_TRACKS_REQUEST:
      return state.set('isFetching', true);
    case RECOMMENDED_TRACKS_HYDRATED:
      return state.set('isFetching', false);
    case RECOMMENDED_TRACKS_SUCCESS: {
      return state.merge({
        isFetching: false,
        isHydrated: true,
        recommendedTracks: action.recommendedTracks,
        targetAttributes: action.targetAttributes,
        error: null,
      });
    }
    case RECOMMENDED_TRACKS_FAILURE:
      return state.merge({
        isFetching: false,
        error: action.error,
      });
    case CREATE_RECOMMENDED_PLAYLIST_REQUEST:
      return state.set('isCreatingPlaylist', true);
    case CREATE_RECOMMENDED_PLAYLIST_SUCCESS:
      return state.merge({
        isCreatingPlaylist: false,
        isPlaylistCreated: true,
        error: null,
      });
    case CREATE_RECOMMENDED_PLAYLIST_FAILURE:
      return state.merge({
        isCreatingPlaylist: false,
        isPlaylistCreated: false,
        error: action.error,
      });
    default:
      return state;
  }
}
