import React, { useState } from "react";
import firebase from "firebase/app";
import { connect } from "react-redux";
import styles from "./AddRecordForm.module.scss";
import CurrentTime from "../Timer/CurrentTime";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import { addRecord } from "../../store/actions/recordsAction";
import { updateProjectDuration } from "../../store/actions/projectsAction";
import Input from "../../Components/atoms/Input";
import SelectProject from "./SelectProject";

const AddRecordForm = props => {
  const [currentTimestamp, setCurrentTimestamp] = useState(0);
  const [timerPaused, setTimerPaused] = useState(true);
  const [timerInterval, setTimerInterval] = useState("");
  const [timestampWhenPaused, setTimestampWhenPaused] = useState(0);
  const [projectTitle, setProjectTitle] = useState("No project");

  const getProjectTitle = title => {
    setProjectTitle(title);
  };
  //start the timer
  const start = () => {
    const timeStart = new Date(); //time when timer starts
    setTimerInterval(
      setInterval(() => {
        const timeNow = new Date();
        const currentTimestamp =
          timestampWhenPaused + timeNow.getTime() - timeStart.getTime(); //calculate current value of the timer
        setCurrentTimestamp(currentTimestamp);
      }, 1000)
    );
    timerPaused && setTimerPaused(false);
  };

  //pause the timer
  const pause = () => {
    setTimestampWhenPaused(currentTimestamp);
    clearInterval(timerInterval); //reset the timer
    setTimerPaused(true);
  };

  //stop the timer
  const stop = e => {
    e.preventDefault();
    clearInterval(timerInterval);
    const project = {
      id: e.target.project.value,
      title: projectTitle
    };
    const now = new Date();
    const record = {
      time: currentTimestamp,
      description: e.target[0].value,
      project,
      createdAt: firebase.firestore.Timestamp.fromDate(now)
    };
    if (currentTimestamp > 0) {
      props.addRecord(record);
      props.updateProjectDuration(project.id, record.time);
      e.target.reset();
    } else {
      alert("No record");
    }

    setTimestampWhenPaused(0);
    setCurrentTimestamp(0);
    setTimerPaused(true);
  };

  return (
    <form onSubmit={stop}>
      <Input type="text" placeholder="What are you working on?" />
      <SelectProject getProjectTitle={getProjectTitle} />
      <CurrentTime timestamp={currentTimestamp} />
      <button
        type="button"
        onClick={timerPaused ? start : pause}
        className={timerPaused ? styles.start : styles.pause}
      >
        {timerPaused ? (
          <FaPlay className={styles.icon} />
        ) : (
          <FaPause className={styles.icon} />
        )}
      </button>
      <button type="submit" className={styles.stop}>
        <FaStop />
      </button>
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
