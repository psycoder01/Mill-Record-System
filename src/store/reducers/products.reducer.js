import {
  FETCHPRODUCTS,
  UPDATEPRODUCT,
  DELPRODUCT,
  ADDPRODUCT
} from "../actions/types.action";

const initialState = {
  products: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHPRODUCTS:
      return Object.assign({}, state, {
        products: action.payload,
      });
    case UPDATEPRODUCT:
      let position = state.products.findIndex(
        (item) => item._id === action.payload._id
      );
      state.products[position] = action.payload;
      return Object.assign({}, state, {});
    case ADDPRODUCT:
      return Object.assign({}, state, {
        products: [...state.products, action.payload],
      });
    case DELPRODUCT:
      return Object.assign(
        {},state,
        { products: state.products.filter((item) => item._id !== action.payload) }
      );
    default:
      return state;
  }
};

export default productsReducer;
