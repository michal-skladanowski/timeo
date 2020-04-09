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
