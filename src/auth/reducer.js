import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './actions';

import { getStoredAuthData } from '../utils';

export const initialState = {
  loggingIn: false,
  idToken: null,
  error: null,
};

function initializeState() {
  const storedAuthData = getStoredAuthData();
  return Object.assign({}, initialState, storedAuthData);
}

export default function auth(state = initializeState(), action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        idToken: action.idToken,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        idToken: null,
        error: action.error,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
