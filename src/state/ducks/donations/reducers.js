import * as types from './types';

const initialState = {
  donationRequests: {},
  requestDetails: {},
};

const donationReducers = function(state = initialState, { type, payload }) {
  switch (type) {
    case types.GET_ALL_REQUESTS_COMPLETED:
      return {
        ...state,
        donationRequests: {
          ...payload,
        },
      };
    case types.GET_REQUEST_BY_ID_COMPLETED:
      return {
        ...state,
        requestDetails: payload,
      };
    case types.UPDATE_REQUEST_COMPLETED:
      return {
        ...state,
        requestDetails: payload,
      };
    default:
      return state;
  }
};

export default donationReducers;
