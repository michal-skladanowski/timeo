import React from "react";
import moment from "moment";
import styles from "./record.module.scss";
const Record = ({ data }) => {
  const { createdAt, description, time } = data;

  return (
    <li className={styles.wrapper}>
      <div>{createdAt && moment(createdAt.toDate()).fromNow()}</div>
      <div>{description}</div>
      <div>{time && moment.utc(time).format("HH:mm:ss")}</div>
    </li>
  );
};

export default Record;
