export const getError = (state) => state.recommended.error;
export const getIsCreatingPlaylist = (state) => state.recommended.isCreatingPlaylist;
export const getIsFetching = (state) => state.recommended.isFetching;
export const getIsHydrated = (state) => state.recommended.isHydrated;
export const getPlaylistCreated = (state) => state.recommended.playlistCreated;
export const getRecommendedTrack = (state, recommendedTrackId) =>
  state.recommended.recommendedTracks.find(s => s.id === recommendedTrackId);
export const getRecommendedTracks = (state) => state.recommended.recommendedTracks;
export const getTargetAttributes = (state) => state.recommended.targetAttributes;
