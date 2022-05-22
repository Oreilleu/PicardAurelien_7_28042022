// Regroupe tous les reducers
import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import postReducer from './post.reducer';

export default combineReducers({
  userReducer,
  postReducer,
});
