import React from "react";
import moment from "moment";
import styles from "./record.module.scss";
const Record = ({ data }) => {
  const { createdAt, description, time } = data;

  return (
    <li className={styles.wrapper}>
      <div>{moment(createdAt).calendar()}</div>
      <div>{description}</div>
      <div>{moment.utc(time).format("HH:mm:ss")}</div>
    </li>
  );
};

export default Record;
