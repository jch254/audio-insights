import * as actions from './actions';
import reducer from './reducer';
import * as sagas from './sagas';
import * as selectors from './selectors';

import ArtistsPage from './ArtistsPage';

const components = {
  ArtistsPage,
};

export { actions, components, reducer, sagas, selectors };
