export const getArtist = (state, artistId) => state.artists.getIn(['artists', artistId]);
export const getArtists = (state) => state.artists.get('artists');
export const getError = (state) => state.artists.get('error');
export const getIsFetching = (state) => state.artists.get('isFetching');
export const getIsHydrated = (state) => state.artists.get('isHydrated');
