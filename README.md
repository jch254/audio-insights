# [Audio Insights (Live Demo)](https://audio-insights.603.nu)

[Bitbucket Pipelines status](https://bitbucket.org/jch254/audio-insights/addon/pipelines/home)

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
on using React and Redux best practices and making the app as responsive as possible. This project was written with a functional mindset with help from Immutable.js and Reselect for efficient client-side data manipulation.

This project is deployed to AWS on S3, CloudFront is used as a CDN and Route 53 is used for DNS. All infrastructure is defined as code in the [/infrastructure](../master/infrastructure) directory. Manual steps suck so this project uses Bitbucket Pipelines to automate the build and deployment to AWS - see [bitbucket-pipelines.yml](../master/bitbucket-pipelines.yml). AWS credentials are set in this file to take advantage of [Bitbucket Pipelines environment variables](https://confluence.atlassian.com/bitbucket/environment-variables-in-bitbucket-pipelines-794502608.html).

I'd be thankful for any feedback or suggestions. I look forward to applying the skills I've
acquired building this app on future projects.

![Mosaic](https://img.jch254.com/Mosaic.png)

![Modal](https://img.jch254.com/Modal.png)

![Recommended](https://img.jch254.com/Recommended.png)

![Artists](https://img.jch254.com/Artists.png)

## Main Technologies Used

* [React](https://facebook.github.io/react/) (ft. various packages)
* [Redux](https://github.com/reactjs/redux/) (ft. various middleware)
* [Redux Saga](https://github.com/yelouafi/redux-saga/)
* [Immutable](https://github.com/facebook/immutable-js/)
* [Rebass](https://github.com/jxnblk/rebass)
* [Webpack](https://github.com/webpack/webpack)
* [Node.js](https://github.com/nodejs/node)

**SPOTIFY_CLIENT_ID, SPOTIFY_SCOPES and SPOTIFY_CALLBACK_URI environment variable must be set before `npm run` commands below.**

E.g. `SPOTIFY_CLIENT_ID=YOUR_CLIENT_ID SPOTIFY_SCOPES="user-top-read playlist-modify-private" SPOTIFY_CALLBACK_URI="http://localhost:3001/spotifylogincallback" npm run dev`

## Running locally

1. Create a new [Spotify API app](https://developer.spotify.com/my-applications)
1. Add http://localhost:3001/spotifylogincallback as a Redirect URI for your newly created app (don't forget to press save)
1. Run the following commands in the app's root directory then open http://localhost:3001

```
npm install
npm run dev
```

## Building the production version

1. Run the following commands in the app's root directory then check the /dist folder

```
npm install
npm run build
```

### Deployment/Infrastructure

Refer to the [/infrastructure](https://github.com/jch254/audio-insights/tree/master/infrastructure) directory.
