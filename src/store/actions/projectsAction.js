export const addProject = project => {
  return (dispatch, getState, getFirebase) => {
    const firestore = getFirebase().firestore();
    const user = getState().firebase.auth.uid;
    const newProject = {
      ...project,
      user
    };
    firestore
      .collection("projects")
      .add(newProject)
      .then(() => {
        console.log(newProject);
        dispatch({ type: "ADD_PROJECT", newProject });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const getProjects = () => {
  return (dispatch, getState, getFirebase) => {
    const firestore = getFirebase().firestore();
    const user = getState().firebase.auth.uid;
    firestore
      .collection("projects")
      .where("user", "==", user)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const updateProjectDuration = (id, duration) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();
    firestore
      .collection("projects")
      .doc(id)
      .update({ duration: firebase.firestore.FieldValue.increment(duration) })
      .catch(err => {
        console.log(err);
      });
  };
};

export const deleteProject = id => {
  return (dispatch, getState, getFirebase) => {
    const firestore = getFirebase().firestore();
    const user = getState().firebase.auth.uid;

    firestore
      .collection("records")
      .where("user", "==", user)
      .where("project.id", "==", id)
      .get()
      .then(querySnapshot => {
        console.log("odpalam sie w querysnapshot", querySnapshot);
        querySnapshot.forEach(doc => {
          doc.ref.delete();
          console.log(doc.ref, doc);
        });
      })
      .catch(err => {
        console.log("wypierdalam sie na usuwaniu recordow", err);
      });

    firestore
      .collection("projects")
      .doc(id)
      .delete()
      .then(() => {})
      .catch(err => {
        console.log(err);
      });
  };
};
