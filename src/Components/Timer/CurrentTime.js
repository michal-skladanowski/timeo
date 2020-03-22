import React from "react";
import moment from "moment";
import styles from "./CurrentTime.module.scss";

const currentTime = props => {
 
  return (
    <div className={styles.wrapper}>
      {moment.utc(props.timestamp).format("HH:mm:ss")}
    </div>
  );
};
export default currentTime;
