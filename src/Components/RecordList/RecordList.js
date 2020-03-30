import React from "react";
import Record from "./Record";
import styles from './recordList.module.scss';

const RecordList = props => (
  <ul className={styles.wrapper}>
    {props.recordsArray.map(element => {
      console.log(element);
      return <Record time={element.time} description={element.description} createdAt={element.createdAt} key={element.description} />;
    })}
  </ul>
);

export default RecordList;
