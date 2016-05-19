# [Audio Insights (Live Demo)](http://ai.603.nu)

[![Build Status](https://semaphoreci.com/api/v1/jch254/audio-insights-2/branches/master/shields_badge.svg)](https://semaphoreci.com/jch254/audio-insights-2)

## Overview

I built this web app teach myself about front-end development with
[React](https://facebook.github.io/react/) and [Redux](http://redux.js.org).
For a long while I've yearned for an enjoyable, fast and understandable way to create
front-ends for APIs that I build. I've experimented with various other frameworks/tools
but none resonated with me like the React/Redux combo. The community around these
technologies is outstanding, something I feel back-end technologies sometimes lack. I
haven't had this much fun writing code in a while!

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

![Mosaic](http://img.jch254.com/Mosaic.png)

![Modal](http://img.jch254.com/Modal.png)

![Recommended](http://img.jch254.com/Recommended.png)

![Artists](http://img.jch254.com/Artists.png)

## Technologies Used

* [React](https://facebook.github.io/react/)
* [Redux](https://github.com/reactjs/redux) (ft. various middleware)
* [Redux Saga](https://github.com/yelouafi/redux-saga/)
* [React Router](https://github.com/reactjs/react-router/)
* [React Motion](https://github.com/chenglou/react-motion)
* [Rebass](https://github.com/jxnblk/rebass)
* [Reflexbox](https://github.com/jxnblk/reflexbox)
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
1. Update the config.js file with your production config values
2. Run the following commands in the app's root directory then check the /dist folder
```
npm install
npm run build
```

## Good times!
