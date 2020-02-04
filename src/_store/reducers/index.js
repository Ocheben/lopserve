import {combineReducers} from 'redux';
import userInfo from './auth/authReducer';
import userData from './user/userReducer';

const reducers = {
  userInfo,
  userData,
};

const rootReducer = combineReducers({
  ...reducers,
});

export default rootReducer;
