import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import recycleState from 'redux-recycle';
import Perf from 'react-addons-perf';
import { Iterable } from 'immutable';

import { reducer as appReducer, actions as appActions } from './app';
import { reducer as artists } from './artists';
import { reducer as authReducer, actions as authActions } from './auth';
import { reducer as mosaic } from './mosaic';
import { reducer as recommended } from './recommended';
import rootSaga from './rootSaga';

const reducer = combineReducers(
  {
    auth: authReducer,
    app: recycleState(appReducer, [authActions.LOGOUT], appReducer.initialState),
    artists: recycleState(
      artists,
      [authActions.LOGOUT, appActions.TERM_CHANGE],
      artists.initialState,
    ),
    mosaic: recycleState(
      mosaic,
      [authActions.LOGOUT, appActions.TERM_CHANGE],
      mosaic.initialState,
    ),
    recommended: recycleState(
      recommended,
      [authActions.LOGOUT, appActions.TERM_CHANGE],
      recommended.initialState,
    ),
    routing: routerReducer,
  },
);

export default function configureStore(browserHistory, initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, routerMiddleware(browserHistory)];

  if (process.env.NODE_ENV !== 'production') {
    // Log Immutable state beautifully
    const logger = createLogger({
      stateTransformer: (state) => {
        const beautifulState = {};

        Object.keys(state).forEach((key) => {
          if (Iterable.isIterable(state[key])) {
            beautifulState[key] = state[key].toJS();
          } else {
            beautifulState[key] = state[key];
          }
        });

        return beautifulState;
      },
    });

    middlewares.push(logger);

    window.Perf = Perf;
  }

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension &&
      process.env.NODE_ENV !== 'production' ? window.devToolsExtension() : f => f,
  ));

  sagaMiddleware.run(rootSaga);
  return store;
}
