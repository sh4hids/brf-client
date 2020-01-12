import * as types from './types';

export const addCommunity = (data, token) => ({
  type: types.ADD_COMMUNITY,
  meta: {
    async: true,
    blocking: true,
    path: `/communities/`,
    method: 'POST',
    body: data,
    token,
  },
});

export const getAllCommunities = token => ({
  type: types.GET_ALL_COMMUNITIES,
  meta: {
    async: true,
    blocking: true,
    path: `/communities/`,
    method: 'GET',
    token,
  },
});
