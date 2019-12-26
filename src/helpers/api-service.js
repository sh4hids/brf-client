import fetch from '../utils/axios';
import * as config from '../config';
import * as types from '../state/ducks/auth/types';
import AuthService from './auth-service';

const Auth = new AuthService();
const baseUrl = `${config.server}${config.apiVersion}`;
const loginActions = [
  types.LOGIN,
  types.SIGNUP,
  types.FB_LOGIN,
  types.LINKEDIN_LOGIN,
  types.GOOGLE_LOGIN,
];

const apiService = () => next => action => {
  const result = next(action);
  if (!action.meta || !action.meta.async) {
    return result;
  }

  const { path, method = 'GET', body, type, token } = action.meta;

  if (!path) {
    throw new Error(`'path' not specified for async action ${action.type}`);
  }

  let url = `${baseUrl}${path}`;
  const csrf = Auth.getCsrfToken();

  if (action.type === types.LOGIN) {
    url = `${config.server}${path}`;
  }

  return fetch({ url, method, body, type, token, csrf }).then(
    res => handleResponse(res, action, next),
    err => handleErrors(err, action, next)
  );
};

function handleErrors(err, action, next) {
  if (action.type === 'auth/logout') {
    Auth.removeToken();
  }

  if (err.status === 401) {
    next({
      type: `auth/set_user_unauthorized`,
      payload: err,
      meta: action.meta,
    });
  } else {
    next({
      type: `${action.type}_failed`,
      payload: err,
      meta: action.meta,
    });
  }

  return Promise.reject(err);
}

function handleResponse(res, action, next) {
  if (loginActions.includes(action.type)) {
    let { user, token } = res;
    user = {
      ...user,
    };
    Auth.setToken(token);
    Auth.setUser(user);
  } else if (action.type === 'auth/logout') {
    Auth.removeToken();
  }

  next({
    type: `${action.type}_completed`,
    payload: res,
    meta: action.meta,
  });

  return res;
}

export default apiService;
