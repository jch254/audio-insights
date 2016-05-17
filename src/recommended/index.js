import * as actions from './actions';
import reducer from './reducer';
import * as sagas from './sagas';
import * as selectors from './selectors';

import RecommendedPage from './RecommendedPage';

const components = {
  RecommendedPage,
};

export { actions, components, reducer, sagas, selectors };
