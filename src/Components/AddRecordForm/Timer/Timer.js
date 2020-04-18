import React, { useState } from "react";
import moment from "moment";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import styled, { keyframes } from "styled-components";
const StyledWrapper = styled.div`
  display: inline-block;
  width: 150px;
  margin: 0 20px;
  color: grey;
  font-weight: 400;
  font-size: 20px;
  vertical-align: middle;
  text-align: center;
`;
const appears = keyframes`
      from {
        opacity: 0%;
      }

      to {
        opacity: 100%;
      }
`;
const handleButtonType = type => {
  switch (type) {
    case "stop":
      return "rgb(226, 5, 5)";
    case "pause":
      return "rgb(255, 154, 4)";
    default:
      return "rgb(75, 200, 0)";
  }
};

const StyledButton = styled.button`
  display: inline-block;
  border: none;
  border-radius: 0.25em;
  text-align: center;
  margin: 0 10px;
  text-decoration: none;
  padding: 12px 0;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  width: 40px;
  height: 40px;
  color: white;
  background-color: ${props => handleButtonType(props.state)};
  transition: background-color 600ms ease-in-out;

  &:focus,
  &:active {
    outline: none;
  }
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px -5px grey;
  }

  svg {
    animation-duration: 1000ms;
    animation-name: ${appears};
  }
`;

const Timer = ({ getTimestamp }) => {
  const [currentTimestamp, setCurrentTimestamp] = useState(0);
  const [timerInterval, setTimerInterval] = useState("");
  const [timestampWhenPaused, setTimestampWhenPaused] = useState(0);
  const [timerPaused, setTimerPaused] = useState(true);

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
    !timerPaused && setTimerPaused(true);
  };

  //stop the timer
  const stop = e => {
    getTimestamp(currentTimestamp);
    clearInterval(timerInterval);
    setTimestampWhenPaused(0);
    setCurrentTimestamp(0);
    setTimerPaused(true);
  };

  return (
    <>
      <StyledWrapper>
        {moment.utc(currentTimestamp).format("HH:mm:ss")}
      </StyledWrapper>
      <StyledButton
        type="button"
        onClick={timerPaused ? start : pause}
        state={timerPaused ? "start" : "pause"}
      >
        {timerPaused ? <FaPlay /> : <FaPause />}
      </StyledButton>
      <StyledButton type="submit" state="stop" onClick={stop}>
        <FaStop />
      </StyledButton>
    </>
  );
};
export default Timer;
