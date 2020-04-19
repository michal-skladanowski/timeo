import React from "react";
import LoggedUserTemplate from "../../Templates/LoggedUserTemplate";
import AddProjectForm from "../../Components/AddProjectForm/AddProjectForm";
import RecordList from "../../Components/RecordList/RecordList";

import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const ProjectsView = ({ projects }) => {
  const columnTitles = [
    ["Project", "title"],
    ["Duration", "duration"]
  ];
  const addProjectForm = <AddProjectForm />;
  const projectsList = (
    <RecordList
      recordsArray={projects}
      type="projects"
      view="projectsView"
      headers={columnTitles}
    />
  );
  return <LoggedUserTemplate header={addProjectForm} body={projectsList} />;
};

const mapStateToProps = state => {
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    query: state.query.projectsView
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    if (!props.auth.uid) return [];
    return [
      {
        collection: "projects",
        where: [["user", "==", props.auth.uid]],
        limit: props.query.queryPage * 25,
        orderBy: [props.query.orderBy, props.query.sortType]
      }
    ];
  })
)(ProjectsView);
