const config = {
  clientId: 'YOUR CLIENT ID',
  scope: encodeURIComponent('user-top-read playlist-modify-private'),
  callbackUri: encodeURIComponent('http://localhost:3001/spotifylogincallback'),
};

export default config;
