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
