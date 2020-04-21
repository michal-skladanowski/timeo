export const addRecord = record => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();
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
    firestore
      .collection("projects")
      .doc(record.project.id)
      .update({
        itemsCount: firebase.firestore.FieldValue.increment(1),
        duration: firebase.firestore.FieldValue.increment(record.duration)
      })
      .catch(err => {
        console.log(err);
      });
    firestore
      .collection("users")
      .doc(user)
      .update({
        recordsCount: firebase.firestore.FieldValue.increment(1)
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const deleteRecord = record => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();
    const user = getState().firebase.auth.uid;
    const recordId = record.id;
    firestore
      .collection("records")
      .doc(record.id)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_RECORD", recordId });
      })
      .catch(err => {
        console.log(err);
      });
    firestore
      .collection("projects")
      .doc(record.project.id)
      .update({
        itemsCount: firebase.firestore.FieldValue.increment(-1),
        duration: firebase.firestore.FieldValue.increment(-record.duration)
      })
      .catch(err => {
        console.log(err);
      });
    firestore
      .collection("users")
      .doc(user)
      .update({
        recordsCount: firebase.firestore.FieldValue.increment(-1)
      })
      .catch(err => {
        console.log(err);
      });
  };
};
