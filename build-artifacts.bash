#!/bin/bash -ex

yarn install
export NODE_ENV=production
export SPOTIFY_SCOPES="user-top-read playlist-modify-private"
export SPOTIFY_CALLBACK_URI="https://audio-insights.603.nu/spotifylogincallback"
yarn run build
