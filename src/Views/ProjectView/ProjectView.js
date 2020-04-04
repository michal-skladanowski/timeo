import React from "react";
import RecordList from "../../Components/RecordList/RecordList";
import LoggedUserTemplate from "../../Templates/LoggedUserTemplate";
import StyledLoadingSpinner from "../../Components/Loader/Loader";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const ProjectView = ({ project, records, match }) => {
  console.log(match.params.id);
  const { title } = project ? project : "";
  const recordList = records ? (
    records.length > 0 ? (
      <RecordList recordsArray={records} />
    ) : (
      "No records"
    )
  ) : (
    <StyledLoadingSpinner />
  );
  return <LoggedUserTemplate header={title} body={recordList} />;
};

const mapStateToProps = state => {
  console.log(state);
  const projects = state.firestore.ordered.projects;
  const project = projects ? projects[0] : null;
  return {
    records: state.firestore.ordered.records,
    project,
    auth: state.firebase.auth
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
          ["project", "==", props.match.params.id]
        ]
      },
      {
        collection: "projects",
        doc: props.match.params.id
      }
    ];
  })
)(ProjectView);
