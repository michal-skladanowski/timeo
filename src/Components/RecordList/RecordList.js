import React from "react";
import Record from "./Record";

const RecordList = props => (
  <ul>
    {props.recordsArray.map(element => {
      console.log(element);
      return <Record time={element.time} description={element.description} key={element} />;
    })}
  </ul>
);

export default RecordList;
