module.exports = {
  'process.env.NODE_ENV': JSON.stringify('development'),
  'process.env.SPOTIFY_CLIENT_ID': JSON.stringify('YOUR SPOTIFY CLIENT ID'),
  'process.env.SPOTIFY_SCOPES': JSON.stringify('user-top-read playlist-modify-private'),
  'process.env.SPOTIFY_CALLBACK_URI': JSON.stringify('http://localhost:3001/spotifylogincallback'),
  'process.env.GA_ID': JSON.stringify('YOUR GOOGLE ANALYTICS ID'),
};
