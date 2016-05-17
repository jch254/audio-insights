import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import { routerReducer } from 'react-router-redux';
import recycleState from 'redux-recycle';

import { reducer as appReducer, actions as appActions } from './app';
import { reducer as artists } from './artists';
import { reducer as authReducer, actions as authActions } from './auth';
import { reducer as mosaic } from './mosaic';
import { reducer as recommended } from './recommended';
import rootSaga from './rootSaga';

const logger = createLogger();
const reducer = combineReducers(
  {
    auth: authReducer,
    app: recycleState(appReducer, [authActions.LOGOUT], appReducer.initialState),
    artists: recycleState(
      artists, [authActions.LOGOUT, appActions.TERM_CHANGE], artists.initialState
    ),
    mosaic: recycleState(
      mosaic, [authActions.LOGOUT, appActions.TERM_CHANGE], mosaic.initialState
    ),
    recommended: recycleState(
      recommended, [authActions.LOGOUT, appActions.TERM_CHANGE], recommended.initialState
    ),
    routing: routerReducer,
  }
);

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, initialState, compose(
    applyMiddleware(sagaMiddleware, logger),
    window.devToolsExtension &&
      process.env.NODE_ENV !== 'production' ? window.devToolsExtension() : f => f
  ));

  sagaMiddleware.run(rootSaga);
  return store;
}
