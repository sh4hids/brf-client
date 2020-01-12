import * as types from './types';

export const addUser = (data, token) => ({
  type: types.ADD_USER,
  meta: {
    async: true,
    blocking: true,
    path: `/persons/`,
    method: 'POST',
    body: data,
    token,
  },
});

export const updateUserInfo = (id, data, token) => ({
  type: types.UPDATE_USER_INFO,
  meta: {
    async: true,
    blocking: true,
    path: `/persons/${id}/`,
    method: 'PATCH',
    body: data,
    token,
  },
});

export const getAllUsers = (
  token,
  { blood_group, community, place, gender, role, mobile }
) => ({
  type: types.GET_ALL_USERS,
  meta: {
    async: true,
    blocking: true,
    path: `/persons/?blood_group=${
      blood_group ? encodeURIComponent(blood_group) : ''
    }&community=${community || ''}&place=${place || ''}&gender=${gender ||
      ''}&role=${role || ''}&mobile=${mobile || ''}`,
    method: 'GET',
    token,
  },
});

export const getEligibleDonors = (
  token,
  { blood_group, madrasa, place, gender, role, mobile }
) => ({
  type: types.GET_ELIGIBLE_DONORS,
  meta: {
    async: true,
    blocking: true,
    path: `/persons/eligible_donors/?blood_group=${
      blood_group ? encodeURIComponent(blood_group) : ''
    }&madrasa=${madrasa || ''}&place=${place || ''}&gender=${gender ||
      ''}&role=${role || ''}&mobile=${mobile}`,
    method: 'GET',
    token,
  },
});
