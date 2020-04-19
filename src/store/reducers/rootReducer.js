import authReducer from "./authReducer";
import recordsReducer from "./recordsReducer";
import projectReducer from "./projectReducer";
import queryReducer from "./queryReducer";
import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const rootReducer = combineReducers({
  auth: authReducer,
  record: recordsReducer,
  project: projectReducer,
  query: queryReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export default rootReducer;
