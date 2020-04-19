import React from "react";
import RecordList from "../../Components/RecordList/RecordList";
import AddRecordForm from "../../Components/AddRecordForm/AddRecordForm";
import LoggedUserTemplate from "../../Templates/LoggedUserTemplate";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class DashboardView extends React.Component {
  columnTitles = [
    ["Date", "createdAt"],
    ["Description", "description"],
    ["Project", "project.title"],
    ["Duration", "duration"]
  ];
  render() {
    const addRecordForm = <AddRecordForm />;
    const recordList = (
      <RecordList
        recordsArray={this.props.records}
        type="record"
        view="dashboardView"
        headers={this.columnTitles}
      />
    );

    return <LoggedUserTemplate header={addRecordForm} body={recordList} />;
  }
}
const mapStateToProps = state => {
  return {
    records: state.firestore.ordered.records,
    auth: state.firebase.auth,
    query: state.query.dashboardView
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    if (!props.auth.uid) return [];
    return [
      {
        collection: "records",
        where: [["user", "==", props.auth.uid]],
        limit: props.query.queryPage * 2,
        orderBy: [props.query.orderBy, props.query.sortType]
      }
    ];
  })
)(DashboardView);
