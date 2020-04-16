export const addRecord = record => {
  return (dispatch, getState, getFirebase) => {
    console.log("w returnie", record);
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
        dispatch({ type: "ADD_RECORD", newRecord });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const deleteRecord = recordId => {
  return (dispatch, getState, getFirebase) => {
    const firestore = getFirebase().firestore();

    firestore
      .collection("records")
      .doc(recordId)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_RECORD", recordId });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
