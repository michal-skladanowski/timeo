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
        console.log(newRecord);
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
    const user = getState().firebase.auth.uid;
    console.log("w returnie", user);
    firestore
      .collection("records")
      .doc(recordId)
      .delete()
      .then(() => {
        console.log("wyjebany", recordId);
        dispatch({ type: "DELETE_RECORD", recordId });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
