import React from "react";
import firebase from "firebase/app";
import { connect } from "react-redux";
import { addProject, getProjects } from "../../store/actions/projectsAction";
import Input from "../../Components/atoms/Input";
import styled from "styled-components";

const StyledButton = styled.button`
  height: 38px;
  width: 120px;
  display: inline-block;
  border: none;
  border-radius: 0.25em;
  margin-left: 20px;
  text-align: center;
  font-size: 1em;
  vertical-align: middle;
  cursor: pointer;
  color: white;
  background-color: #051e34;
`;

const AddProjectForm = ({ addProject, getList }) => {
  const submitHandler = e => {
    e.preventDefault();
    const now = new Date();
    const project = {
      title: e.target[0].value,
      createdAt: firebase.firestore.Timestamp.fromDate(now),
      itemsCount: 0,
      duration: 0
    };
    addProject(project);
    e.target.reset();
  };
  return (
    <form onSubmit={submitHandler}>
      <Input type="text" />
      <StyledButton type="submit">Add project</StyledButton>
      {getList()}
    </form>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    addProject: record => dispatch(addProject(record)),
    getList: () => dispatch(getProjects())
  };
};
export default connect(null, mapDispatchToProps)(AddProjectForm);
