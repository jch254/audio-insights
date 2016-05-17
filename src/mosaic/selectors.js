export const getError = (state) => state.mosaic.error;
export const getIsFetching = (state) => state.mosaic.isFetching;
export const getIsHydrated = (state) => state.mosaic.isHydrated;
export const getTracks = (state) => state.mosaic.tracks;
export const getTrack = (state, trackId) => state.mosaic.tracks.find(t => t.id === trackId);
