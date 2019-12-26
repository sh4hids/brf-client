import * as types from './types';

const initialState = {
  users: {},
  eligibleDonors: {},
};

const userReducers = function(state = initialState, { type, payload }) {
  switch (type) {
    case types.GET_ALL_USERS_COMPLETED:
      return {
        ...state,
        users: {
          ...payload,
        },
      };
    case types.GET_ELIGIBLE_DONORS_COMPLETED:
      return {
        ...state,
        eligibleDonors: {
          ...payload,
        },
      };
    default:
      return state;
  }
};

export default userReducers;
