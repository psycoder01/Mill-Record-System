import productsReducer from './products.reducer';
import importsReducer from './imports.reducer';
import exportsReducer from './exports.reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    productsReducer,importsReducer,exportsReducer
});

export default rootReducer;