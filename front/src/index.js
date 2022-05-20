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

// Log redux
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
