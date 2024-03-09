import { combineReducers } from "redux";
import bookReducer from "./bookReducers";
import extraOptionReducer from "./extraOptionReducer";

const reducers = combineReducers({
  bookReducer: bookReducer,
  extraOptionReducer: extraOptionReducer,
});

export default reducers;
