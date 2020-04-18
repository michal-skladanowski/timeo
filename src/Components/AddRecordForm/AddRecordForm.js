import React, { useState } from "react";
import firebase from "firebase/app";
import { connect } from "react-redux";
import Timer from "../Timer/Timer";
import { addRecord } from "../../store/actions/recordsAction";
import { updateProjectDuration } from "../../store/actions/projectsAction";
import Input from "../../Components/atoms/Input";
import SelectProject from "./SelectProject";

const AddRecordForm = props => {
  const [projectTitle, setProjectTitle] = useState("No project");
  const [timpestamp, setTimestamp] = useState(0);

  const getProjectTitle = title => {
    setProjectTitle(title);
  };
  const getTimestamp = duration => {
    setTimestamp(duration);
  };

  //stop the timer
  const handleSubmit = e => {
    e.preventDefault();
    const project = {
      id: document.addProjectForm.project.value,
      title: projectTitle
    };
    const now = new Date();
    const record = {
      time: timpestamp,
      description: document.addProjectForm[0].value,
      project,
      createdAt: firebase.firestore.Timestamp.fromDate(now)
    };
    if (timpestamp > 0) {
      props.addRecord(record);
      props.updateProjectDuration(project.id, record.time);
      document.addProjectForm.reset();
    } else {
      alert("No record");
    }
  };

  return (
    <form onSubmit={handleSubmit} name="addProjectForm">
      <Input type="text" placeholder="What are you working on?" />
      <SelectProject getProjectTitle={getProjectTitle} />
      <Timer getTimestamp={getTimestamp} />
    </form>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    addRecord: record => dispatch(addRecord(record)),
    updateProjectDuration: (id, duration) =>
      dispatch(updateProjectDuration(id, duration))
  };
};
export default connect(null, mapDispatchToProps)(AddRecordForm);
