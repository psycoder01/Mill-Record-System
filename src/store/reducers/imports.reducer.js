import { FETCHIMPORTS,ADDIMPORTS,DELIMPORTS } from "../actions/types.action";

const initialState = {
  imports: []
};

const importsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHIMPORTS:
      return Object.assign({}, state, {
        imports: action.payload
      });
    case ADDIMPORTS:
      return Object.assign({}, state, {
        imports: [...state.imports, action.payload]
      });
    case DELIMPORTS:
      return Object.assign({},state,{
        imports: state.imports.filter(item => item._id !== action.payload)
      });
    default:
      return state;
  }
};

export default importsReducer;
