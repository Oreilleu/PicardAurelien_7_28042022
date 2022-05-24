import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/index.scss';

// redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers';
import { getAllUsers } from './redux/actions/users.actions';

// Log redux
import { composeWithDevTools } from 'redux-devtools-extension';
import { getComments, getLike } from './redux/actions/post.actions';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(getAllUsers());
store.dispatch(getComments());
store.dispatch(getLike());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
