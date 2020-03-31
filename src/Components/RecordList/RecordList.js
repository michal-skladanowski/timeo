import React from "react";
import Record from "./Record";
import styles from "./recordList.module.scss";

const RecordList = props => (
  <ul className={styles.wrapper}>
    {props.recordsArray.map(record => {
      return <Record data={record} key={record.id} />;
    })}
  </ul>
);

export default RecordList;
