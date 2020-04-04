import React from "react";
import LoggedUserTemplate from "../../Templates/LoggedUserTemplate";
import ProjectList from "../../Components/ProjectList/ProjectList";
import AddProjectForm from "../../Components/AddProjectForm/AddProjectForm";
import StyledLoadingSpinner from "../../Components/Loader/Loader";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const ProjectsView = ({ projects }) => {
  const addProjectForm = <AddProjectForm />;
  const projectsList = projects ? (
    projects.length > 0 ? (
      <ProjectList projectsArray={projects} />
    ) : (
      "No projectss"
    )
  ) : (
    <StyledLoadingSpinner />
  );
  return <LoggedUserTemplate header={addProjectForm} body={projectsList} />;
};

const mapStateToProps = state => {
  console.log(state);
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    if (!props.auth.uid) return [];
    return [
      { collection: "projects", where: [["user", "==", props.auth.uid]] }
    ];
  })
)(ProjectsView);
