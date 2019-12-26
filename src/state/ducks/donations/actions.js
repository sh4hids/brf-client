import * as types from './types';

export const makeRequest = (data, token) => ({
  type: types.MAKE_REQUEST,
  meta: {
    async: true,
    blocking: true,
    path: `/blood_requests/`,
    method: 'POST',
    body: data,
    token,
  },
});

export const updateRequest = (id, data, token) => ({
  type: types.UPDATE_REQUEST,
  meta: {
    async: true,
    blocking: true,
    path: `/blood_requests/${id}/`,
    method: 'PATCH',
    body: data,
    token,
  },
});

export const serveRequest = (data, token) => ({
  type: types.SERVE_REQUEST,
  meta: {
    async: true,
    blocking: true,
    path: `/history/`,
    method: 'POST',
    body: data,
    token,
  },
});

export const getAllRequests = token => ({
  type: types.GET_ALL_REQUESTS,
  meta: {
    async: true,
    blocking: true,
    path: `/blood_requests/`,
    method: 'GET',
    token,
  },
});

export const getRequestById = (id, token) => ({
  type: types.GET_REQUEST_BY_ID,
  meta: {
    async: true,
    blocking: true,
    path: `/blood_requests/${id}/`,
    method: 'GET',
    token,
  },
});
