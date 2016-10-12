export const getError = state => state.recommended.get('error');

export const getIsCreatingPlaylist = state => state.recommended.get('isCreatingPlaylist');

export const getIsFetching = state => state.recommended.get('isFetching');

export const getIsHydrated = state => state.recommended.get('isHydrated');

export const getIsPlaylistCreated = state => state.recommended.get('isPlaylistCreated');

export const getRecommendedTracks = state => state.recommended.get('recommendedTracks');

export const getRecommendedTrack = (state, recommendedTrackId) =>
  state.recommended.getIn(['recommendedTracks', recommendedTrackId]);

export const getTargetAttributePercentages = state => state.recommended.get('targetAttributes').map(t => Math.round(t * 100));
