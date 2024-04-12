// third-party
import { combineReducers } from "redux";
import bookReducer from "./bookReducers";
// import user from "./user";
// import uiReducer from "./uiReducer";
// import additionReducer from "./additionReducer";
// import loan from "./loanReducer";
// import dateReducer from "./dateReducer";
const reducers = combineReducers({
  bookReducer: bookReducer,
  //   user: user,
  //   uiReducer: uiReducer,
  //   addition: additionReducer,
  //   loan: loan,
  //   date: dateReducer,
});

export default reducers;
