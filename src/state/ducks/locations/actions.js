import * as types from './types';

export const addLocation = (data, token) => ({
  type: types.ADD_LOCATION,
  meta: {
    async: true,
    blocking: true,
    path: `/places/`,
    method: 'POST',
    body: data,
    token,
  },
});

export const getAllLocations = token => ({
  type: types.GET_ALL_LOCATIONS,
  meta: {
    async: true,
    blocking: true,
    path: `/places/`,
    method: 'GET',
    token,
  },
});
