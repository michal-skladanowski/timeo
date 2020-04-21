import React from "react";
import RecordList from "../../Components/RecordList/RecordList";
import LoggedUserTemplate from "../../Templates/LoggedUserTemplate";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { ProjectProvider } from "../../contex/projectContext";

const ProjectView = ({ project, records }) => {
  const { title } = project ? project : "";
  const { itemsCount } = project ? project : "";
  const columnTitles = [
    ["Date", "createdAt"],
    ["Description", "description"],
    ["Duration", "duration"]
  ];
  const recordList = (
    <RecordList
      recordsArray={records}
      type="project"
      view="projectView"
      headers={columnTitles}
      itemsCount={itemsCount}
    />
  );

  return (
    <ProjectProvider value={project}>
      <LoggedUserTemplate header={title} body={recordList} />
    </ProjectProvider>
  );
};

const mapStateToProps = state => {
  const projects = state.firestore.ordered.projects;
  const project = projects ? projects[0] : null;
  return {
    records: state.firestore.ordered.records,
    project,
    auth: state.firebase.auth,
    query: state.query.projectView
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    if (!props.auth.uid) return [];
    return [
      {
        collection: "records",
        where: [
          ["user", "==", props.auth.uid],
          ["project.id", "==", props.match.params.id]
        ],
        limit: props.query.queryPage * 2,
        orderBy: [props.query.orderBy, props.query.sortType]
      },
      {
        collection: "projects",
        doc: props.match.params.id
      }
    ];
  })
)(ProjectView);
