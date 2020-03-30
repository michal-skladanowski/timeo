import authReducer from "./authReducer";
import recordsReducer from "./recordsReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  project: recordsReducer
});

export default rootReducer;
