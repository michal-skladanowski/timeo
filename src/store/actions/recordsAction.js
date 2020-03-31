export const addRecord = record => {
  return (dispatch, getState, getFirebase) => {
    // setTimeout(() => {
    //   console.log(getFirebase);
    // }, 300);
    const firestore = getFirebase().firestore();

    firestore.collection("records").add({
      ...record,
      createdAt: new Date()
    });
    dispatch({ type: "ADD_RECORD", record });
  };
};
