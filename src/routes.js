import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AboutPage from './shared-components/AboutPage';
import GlossaryPage from './shared-components/GlossaryPage';
import HomePage from './shared-components/HomePage';
import NotFoundPage from './shared-components/NotFoundPage';
import App from './app/App';
import ArtistsPage from './artists/ArtistsPage';
import SpotifyLoginCallbackHandler from './auth/SpotifyLoginCallbackHandler';
import RestrictedPage from './auth/RestrictedPage';

import { components as mosaicComponents } from './mosaic';
import { components as recommendedComponents } from './recommended';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/about" component={AboutPage} />
    <Route path="/glossary" component={GlossaryPage} />
    <Route path="/spotifylogincallback" component={SpotifyLoginCallbackHandler} />
    <Route component={RestrictedPage}>
      <Route path="/mosaic" component={mosaicComponents.MosaicPage} />
      <Route path="/recommended" component={recommendedComponents.RecommendedPage} />
      <Route path="/artists" component={ArtistsPage} />
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Route>
);
