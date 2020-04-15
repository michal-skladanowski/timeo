import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { Provider, useSelector } from "react-redux";
import thunk from "redux-thunk";
import {
  getFirebase,
  ReactReduxFirebaseProvider,
  isLoaded
} from "react-redux-firebase";
import { createFirestoreInstance, actionTypes } from "redux-firestore";
import firebaseConfig from "./config/firebaseConfig";
import { composeWithDevTools } from "redux-devtools-extension";

firebase.initializeApp(firebaseConfig);
export const firestoreinstance = firebase.firestore();

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
  onAuthStateChanged: (authData, firebase, dispatch) => {
    // Clear redux-firestore state if auth does not exist (i.e logout)
    if (!authData) {
      dispatch({ type: actionTypes.CLEAR_DATA });
    }
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(getFirebase)))
);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
  sessions: "sessions"
};

const AuthIsLoaded = ({ children }) => {
  const auth = useSelector(state => state.firebase.auth);
  if (!isLoaded(auth)) return <div>Loading Screen...</div>;
  return children;
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
