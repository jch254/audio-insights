import * as actions from './actions';
import reducer from './reducer';
import * as sagas from './sagas';
import * as selectors from './selectors';

import RestrictedPage from './RestrictedPage';
import SpotifyLoginCallbackHandler from './SpotifyLoginCallbackHandler';

const components = {
  RestrictedPage,
  SpotifyLoginCallbackHandler,
};

export { actions, components, reducer, sagas, selectors };
