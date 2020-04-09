import React from "react";
import { connect } from "react-redux";
import { addProject, getProjects } from "../../store/actions/projectsAction";
import Input from "../../Components/atoms/Input";

const AddProjectForm = ({ addProject, getList }) => {
  const submitHandler = e => {
    e.preventDefault();
    const project = {
      title: e.target[0].value
    };
    addProject(project);
  };
  return (
    <form onSubmit={submitHandler}>
      <Input type="text" />
      <button type="submit">Add project</button>
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
