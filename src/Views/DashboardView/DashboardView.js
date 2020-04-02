import React from "react";
import RecordList from "../../Components/RecordList/RecordList";
import AddRecordForm from "../../Components/AddRecordForm/AddRecordForm";
import LoggedUserTemplate from "../../Templates/LoggedUserTemplate";
import StyledLoadingSpinner from "../../Components/Loader/Loader";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class DashboardView extends React.Component {
  state = {
    recordsArray: []
  };

  render() {
    const addRecordForm = <AddRecordForm />;
    const recordList =
      this.props.records.length > 0 ? (
        <RecordList recordsArray={this.props.records} />
      ) : (
        <StyledLoadingSpinner />
      );
    return <LoggedUserTemplate header={addRecordForm} body={recordList} />;
  }
}
const mapStateToProps = state => {
  return {
    records: state.firestore.ordered.records || state.record.records,
    auth: state.firebase.auth
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "records", limit: 30 }])
)(DashboardView);
