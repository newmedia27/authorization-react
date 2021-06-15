import { combineReducers } from "redux";
import categories from './categories'
import auth from './auth'

const rootReducer = combineReducers({
  categories,
  auth
});

export default rootReducer;
