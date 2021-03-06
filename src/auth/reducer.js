import { Map } from 'immutable';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './actions';
import { getStoredAuthState } from '../utils';

export const initialState = new Map({
  isLoggingIn: false,
  idToken: null,
  error: null,
});

export default function auth(state = initialState.merge(getStoredAuthState()), action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state.set('isLoggingIn', true);
    case LOGIN_SUCCESS:
      return state.merge({
        isLoggingIn: false,
        idToken: action.idToken,
      });
    case LOGIN_FAILURE:
      return state.merge({
        isLoggingIn: false,
        idToken: null,
        error: action.error,
      });
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
