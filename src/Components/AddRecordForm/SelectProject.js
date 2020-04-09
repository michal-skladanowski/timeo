import React from "react";
import CreatableSelect from "react-select/creatable";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import styled from "styled-components";

const StyledCreatableSelect = styled(CreatableSelect)`
  display: inline-block;
  width: 190px;
  margin-left: 20px;
`;

const SelectProject = ({ projects }) => {
  let projectsOptions;

  if (projects) {
    projectsOptions = projects;
  }

  return (
    <>
      <StyledCreatableSelect
        isClearable
        getOptionLabel={opt => opt.title}
        getOptionValue={opt => opt.id}
        options={projectsOptions}
        name="project"
        placeholder="Select project"
      />
    </>
  );
};
const mapStateToProps = state => {
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
)(SelectProject);
