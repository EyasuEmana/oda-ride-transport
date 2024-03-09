import { combineReducers } from "redux";
import bookReducer from "./bookReducers";
import extraOptionReducer from "./extraOptionReducer";
import carReducer from "./carReducer";
const reducers = combineReducers({
  bookReducer: bookReducer,
  extraOptionReducer: extraOptionReducer,
  carReducer: carReducer,
});

export default reducers;
