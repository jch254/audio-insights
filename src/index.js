import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import ga from 'react-ga';

import configureStore from './configureStore';
import routes from './routes';

const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

if (process.env.NODE_ENV === 'production') {
  ga.initialize(process.env.GA_ID);
}

const logPageView = () => {
  if (process.env.NODE_ENV === 'production') {
    ga.pageview(window.location.pathname);
  }
};

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Router
      history={history}
      routes={routes}
      onUpdate={logPageView}
    />
  </Provider>,
);
