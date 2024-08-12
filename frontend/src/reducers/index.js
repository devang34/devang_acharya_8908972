import { combineReducers } from '@reduxjs/toolkit';
import authReducer, { logout } from './authReducer';
import cartReducer from './cartReducer';

const appReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

const rootReducer = (state, action) => {
  if (action.type === logout.type) {
    return appReducer(undefined, { type: undefined });
  }
  return appReducer(state, action);
};

export default rootReducer;
