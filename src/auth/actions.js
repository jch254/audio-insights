export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export function loginRequest(returnPath = '/') {
  return {
    type: LOGIN_REQUEST,
    returnPath,
  };
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export function loginSuccess(idToken, idTokenExpiry) {
  return {
    type: LOGIN_SUCCESS,
    idToken,
    idTokenExpiry,
  };
}

export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    error,
  };
}

export const LOGOUT = 'LOGOUT';
export function logout() {
  return {
    type: LOGOUT,
  };
}
