import { combineReducers } from "redux";
import bookReducer from "./bookReducers";
import extraOptionReducer from "./extraOptionReducer";
import carReducer from "./carReducer";
import airportReducer from "./airportReducer";
import preferenceReducer from "./preferenceReducer";
import authReducer from "./authReducer";
import footerReducer from "./footerReducer";
const reducers = combineReducers({
  bookReducer: bookReducer,
  extraOptionReducer: extraOptionReducer,
  carReducer: carReducer,
  authReducer: authReducer,
  airportReducer: airportReducer,
  preferenceReducer: preferenceReducer,
  footerReducer: footerReducer,
});

export default reducers;
