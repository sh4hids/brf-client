import * as types from './types';

const initialState = {
  communities: {},
};

const communityReducers = function(state = initialState, { type, payload }) {
  switch (type) {
    case types.GET_ALL_COMMUNITIES_COMPLETED:
      return {
        ...state,
        communities: {
          ...payload,
        },
      };

    default:
      return state;
  }
};

export default communityReducers;
