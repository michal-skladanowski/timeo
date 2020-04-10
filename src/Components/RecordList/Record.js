import React from "react";
import moment from "moment";
import styles from "./record.module.scss";
import { connect } from "react-redux";
import { deleteRecord } from "../../store/actions/recordsAction";
const Record = ({ data, deleteItem }) => {
  const {
    id,
    createdAt,
    description,
    time,
    project = { title: "No project" }
  } = data;
  console.log(id);
  return (
    <li className={styles.wrapper}>
      <div>{createdAt && moment(createdAt.toDate()).fromNow()}</div>
      <div>{description}</div>
      <div>{project.title}</div>
      <div className={styles.time_item}>
        {time && moment.utc(time).format("HH:mm:ss")}
      </div>
      <div>
        <button onClick={() => deleteItem(id)}>x</button>
      </div>
    </li>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    deleteItem: id => dispatch(deleteRecord(id))
  };
};
export default connect(null, mapDispatchToProps)(Record);
