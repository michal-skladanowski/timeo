export const signIn = credentials => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "SIGNIN_SUCCESS" });
      })
      .catch(err => {
        console.log(
          err,
          "error signin action",
          credentials.email,
          credentials.password
        );
        dispatch({ type: "SIGNIN_ERROR" });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    console.log("sign out action before then");
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("sign out action then");
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

export const signUp = newUser => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(resp => {
        console.log(resp);
        firestore
          .collection("users")
          .doc(resp.user.uid)
          .set({
            nickname: "nickname"
          });
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};
