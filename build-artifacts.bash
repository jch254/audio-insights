npm install
export NODE_ENV=production
export SPOTIFY_CLIENT_ID=$SPOTIFY_CLIENT_ID
export SPOTIFY_SCOPES="user-top-read playlist-modify-private"
export SPOTIFY_CALLBACK_URI="https://ai.603.nu/spotifylogincallback"
export GA_ID=$GA_ID
npm run build
