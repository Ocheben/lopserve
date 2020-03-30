import {AUTHCONSTANTS} from '../constants';

const {LOGIN, LOGOUT, SIGNUP} = AUTHCONSTANTS;

export const login = userData => ({
  type: LOGIN,
  payload: userData,
});

export const signup = userData => ({
  type: SIGNUP,
  payload: userData,
});

export const logout = () => ({
  type: LOGOUT,
});
