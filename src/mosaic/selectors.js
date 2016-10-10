export const getError = state => state.mosaic.get('error');
export const getIsFetching = state => state.mosaic.get('isFetching');
export const getIsHydrated = state => state.mosaic.get('isHydrated');
export const getTracks = state => state.mosaic.get('tracks');
export const getTrack = (state, trackId) => state.mosaic.getIn(['tracks', trackId]);
