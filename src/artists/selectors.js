export const getArtist = (state, artistId) =>
  state.artists.artists.find(a => a.id === artistId);
export const getArtists = (state) => state.artists.artists;
export const getError = (state) => state.artists.error;
export const getIsFetching = (state) => state.artists.isFetching;
export const getIsHydrated = (state) => state.artists.isHydrated;
