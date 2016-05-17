import {
  RECOMMENDED_TRACKS_REQUEST,
  RECOMMENDED_TRACKS_HYDRATED,
  RECOMMENDED_TRACKS_SUCCESS,
  RECOMMENDED_TRACKS_FAILURE,
  CREATE_RECOMMENDED_PLAYLIST_REQUEST,
  CREATE_RECOMMENDED_PLAYLIST_SUCCESS,
  CREATE_RECOMMENDED_PLAYLIST_FAILURE,
} from './actions';

export const initialState = {
  isFetching: false,
  isCreatingPlaylist: false,
  playlistCreated: false,
  isHydrated: false,
  recommendedTracks: [],
  targetAttributes: {},
  error: null,
};

export default function recommended(state = initialState, action) {
  switch (action.type) {
    case RECOMMENDED_TRACKS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case RECOMMENDED_TRACKS_HYDRATED:
      return {
        ...state,
        isFetching: false,
      };
    case RECOMMENDED_TRACKS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isHydrated: true,
        recommendedTracks: action.recommendedTracks,
        targetAttributes: action.targetAttributes,
        error: null,
      };
    case RECOMMENDED_TRACKS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case CREATE_RECOMMENDED_PLAYLIST_REQUEST:
      return {
        ...state,
        isCreatingPlaylist: true,
      };
    case CREATE_RECOMMENDED_PLAYLIST_SUCCESS:
      return {
        ...state,
        isCreatingPlaylist: false,
        playlistCreated: true,
        error: null,
      };
    case CREATE_RECOMMENDED_PLAYLIST_FAILURE:
      return {
        ...state,
        isCreatingPlaylist: false,
        playlistCreated: false,
        error: action.error,
      };
    default:
      return state;
  }
}
