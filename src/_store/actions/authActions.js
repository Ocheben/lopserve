import {AUTHCONSTANTS} from '../constants';

const {LOGIN, LOGOUT} = AUTHCONSTANTS;

export const login = userData => ({
  type: LOGIN,
  payload: userData,
});

export const logout = () => ({
  type: LOGOUT,
});
