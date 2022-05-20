// Regroupe tous les reducers
import { combineReducers } from 'redux';
import userReducer from './user.reducer';

export default combineReducers({
  userReducer,
});
