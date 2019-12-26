import * as types from './types';

const initialState = {
  locations: {},
};

const locationReducers = function(state = initialState, { type, payload }) {
  switch (type) {
    case types.GET_ALL_LOCATIONS_COMPLETED:
      return {
        ...state,
        locations: {
          ...payload,
        },
      };

    default:
      return state;
  }
};

export default locationReducers;
