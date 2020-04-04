import React from "react";
import { connect } from "react-redux";
import { addProject } from "../../store/actions/projectsAction";
import Input from "../../Components/atoms/Input";

const AddProjectForm = ({ addProject }) => {
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
    </form>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    addProject: record => dispatch(addProject(record))
  };
};
export default connect(null, mapDispatchToProps)(AddProjectForm);
