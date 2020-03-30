import {AUTHCONSTANTS} from '../../constants';

export const initState = {
  role: 'admin',
  isLoggedIn: false,
};

const {LOGIN, LOGOUT, SIGNUP} = AUTHCONSTANTS;

const userInfo = (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
      };

    case LOGOUT:
      return {
        ...initState,
        isLoggedIn: false,
      };

    case SIGNUP:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
      };
    default:
      return state;
  }
};

export default userInfo;
