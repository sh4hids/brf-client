import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './state/store';
import App from './App';
import { AuthService } from './helpers';
import * as serviceWorker from './serviceWorker';

const Auth = new AuthService();
let initialState = {};

if (Auth.loggedIn()) {
  initialState.auth = {
    isAuthenticated: true,
    token: Auth.getToken(),
  };
}

const store = createStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
