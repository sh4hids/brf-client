import * as types from './types';

export const addMadrasa = (data, token) => ({
  type: types.ADD_MADRASA,
  meta: {
    async: true,
    blocking: true,
    path: `/madrasas/`,
    method: 'POST',
    body: data,
    token,
  },
});

export const getAllMadrasas = token => ({
  type: types.GET_ALL_MADRASAS,
  meta: {
    async: true,
    blocking: true,
    path: `/madrasas/`,
    method: 'GET',
    token,
  },
});
