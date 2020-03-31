import authReducer from "./authReducer";
import recordsReducer from "./recordsReducer";
import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const rootReducer = combineReducers({
  auth: authReducer,
  record: recordsReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export default rootReducer;