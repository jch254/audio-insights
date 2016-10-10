# [Audio Insights (Live Demo)](https://ai.603.nu)

[![Build Status](https://semaphoreci.com/api/v1/jch254/audio-insights-2/branches/master/shields_badge.svg)](https://semaphoreci.com/jch254/audio-insights-2)

## Overview

I built this web app teach myself about front-end development with
[React](https://facebook.github.io/react/) and [Redux](http://redux.js.org).
For a long while I've yearned for an enjoyable, fast and understandable way to create
UIs for APIs that I build. I've experimented with various other frameworks/tools
but none resonated with me like the React/Redux combo. The community around these
technologies is outstanding.

This app connects to the [Spotify API](https://developer.spotify.com/web-api/) using the Implicit
Grant Flow to authenticate. I'm a hobby musician with a deep interest in music and music production.
I thought it'd be an interesting project to present the data available from the Spotify API in
various ways.

I aimed to keep things simple, avoid reinventing the wheel and embrace essentialism (use as little
as possible). Using a component library ([Rebass](http://jxnblk.com/rebass/)) proved invaluable. I
was able to concentrate on 'business logic' yet still create something presentable. I also focused
on using React and Redux best practices and making the app as responsive as possible.

I'd be thankful for any feedback or suggestions. I look forward to applying the skills I've
acquired building this app on future projects.

![Mosaic](https://img.jch254.com/Mosaic.png)

![Modal](https://img.jch254.com/Modal.png)

![Recommended](https://img.jch254.com/Recommended.png)

![Artists](https://img.jch254.com/Artists.png)

## Technologies Used

* [React](https://facebook.github.io/react/) (ft. various packages)
* [Redux](https://github.com/reactjs/redux/) (ft. various middleware)
* [Redux Saga](https://github.com/yelouafi/redux-saga/)
* [Immutable](https://github.com/facebook/immutable-js/)
* [Rebass](https://github.com/jxnblk/rebass)
* [Webpack](https://github.com/webpack/webpack)
* [Node.js](https://github.com/nodejs/node)
* Few more tings...

## Running locally

1. Clone this repository
2. Create a new [Spotify API app](https://developer.spotify.com/my-applications)
3. Add http://localhost:3001/spotifylogincallback as a Redirect URI for your newly created app (don't forget to press save)
4. Copy configExmple.js to config.js (gitignored)
5. Update the newly copied config.js with your Spotify API app's Client ID
6. Run the following commands in the app's root directory then open http://localhost:3001
```
npm install
npm run dev
```

## Building the production version
1. Update config.js with your production config values
2. Run the following commands in the app's root directory then check the /dist folder
```
npm install
npm run build
```

## Good times!
