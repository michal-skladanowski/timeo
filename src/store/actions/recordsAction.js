export const addRecord = record => {
  return (dispatch, getState, getFirebase) => {
    const firestore = getFirebase().firestore();
    const user = getState().firebase.auth.uid;
    const newRecord = {
      ...record,
      user
    };
    firestore
      .collection("records")
      .add(newRecord)
      .then(() => {
        console.log(newRecord);
        dispatch({ type: "ADD_RECORD", newRecord });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
