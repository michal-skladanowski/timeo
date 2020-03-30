import React, { useState } from "react";
import styles from "./AddRecordForm.module.scss";
import CurrentTime from "../Timer/CurrentTime";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";

const AddRecordForm = props => {
  const [currentTimestamp, setCurrentTimestamp] = useState(0);
  const [timerPaused, setTimerPaused] = useState(true);
  const [timerInterval, setTimerInterval] = useState('');
  const [timestampWhenPaused, setTimestampWhenPaused] = useState(0);
  

  //start the timer
  const start = () => {
    const timeStart = new Date(); //time when timer starts
    setTimerInterval ( setInterval(() => {
      const timeNow = new Date();
      const currentTimestamp =
        timestampWhenPaused + timeNow.getTime() - timeStart.getTime(); //calculate current value of the timer            console.log(this.state.currentTime);
      setCurrentTimestamp(currentTimestamp);
    }, 1000));
    timerPaused && setTimerPaused(false);
  };

  //pause the timer
  const pause = () => {
    setTimestampWhenPaused( currentTimestamp );
    clearInterval(timerInterval); //reset the timer
    setTimerPaused(true);
  };

  //stop the timer
  const stop = e => {
    clearInterval(timerInterval);
    console.log(currentTimestamp);
    const now = new Date().getTime();
    currentTimestamp > 0 ? (
        props.addRecord({
            time: currentTimestamp,
            description: e.target[0].value,
            createdAt: now
        },e.target)
    ) : (
        alert('No record')
    );
    setTimestampWhenPaused( 0 );
    setCurrentTimestamp(0);
    setTimerPaused(true);
    e.preventDefault();
     
  };

 

  return (
    <form onSubmit={stop}>
      <input
        type='text'
        className={styles.input}
        placeholder="What are you working on?"
      />
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
      <button 
        type='submit'
        className={styles.stop}>
        <FaStop />
      </button>
    </form>
  );
};

export default AddRecordForm;
