import { FETCHEXPORTS, ADDEXPORTS,DELEXPORTS } from "../actions/types.action";

const initialState = {
  exports: [],
};

const exportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHEXPORTS:
      return Object.assign({}, state, {
        exports: action.payload,
      });
    case ADDEXPORTS:
      return Object.assign({}, state, {
        exports: [...state.exports, action.payload],
      });
    case DELEXPORTS:
      return Object.assign({}, state, {
        exports: state.filter((item) => item._id !== action.payload),
      });
    default:
      return state;
  }
};

export default exportsReducer;
