import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AboutPage from './components/AboutPage';
import GlossaryPage from './components/GlossaryPage';
import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage';
import { components as appComponents } from './app';
import { components as artistsComponents } from './artists';
import { components as authComponents } from './auth';
import { components as mosaicComponents } from './mosaic';
import { components as recommendedComponents } from './recommended';

export default (
  <Route path="/" component={appComponents.App}>
    <IndexRoute component={HomePage} />
    <Route path="/about" component={AboutPage} />
    <Route path="/glossary" component={GlossaryPage} />
    <Route path="/spotifylogincallback"
      component={authComponents.SpotifyLoginCallbackHandler}
    />
  <Route component={authComponents.RestrictedPage}>
      <Route path="/mosaic" component={mosaicComponents.MosaicPage} />
      <Route path="/recommended" component={recommendedComponents.RecommendedPage} />
      <Route path="/artists" component={artistsComponents.ArtistsPage} />
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Route>
);
