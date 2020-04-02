export const addRecord = record => {
  return (dispatch, getState, getFirebase) => {
    const firestore = getFirebase().firestore();

    firestore
      .collection("records")
      .add(record)
      .then(() => {
        console.log(record);
        dispatch({ type: "ADD_RECORD", record });
      });
  };
};
