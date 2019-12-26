import * as types from './types';

const initialState = {
  madrasas: {},
};

const madrasaReducers = function(state = initialState, { type, payload }) {
  switch (type) {
    case types.GET_ALL_MADRASAS_COMPLETED:
      return {
        ...state,
        madrasas: {
          ...payload,
        },
      };

    default:
      return state;
  }
};

export default madrasaReducers;
