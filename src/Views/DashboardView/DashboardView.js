import React from "react";
import RecordList from "../../Components/RecordList/RecordList";
import AddRecordForm from "../../Components/AddRecordForm/AddRecordForm";
import LoggedUserTemplate from "../../Templates/LoggedUserTemplate";
import StyledLoadingSpinner from "../../Components/Loader/Loader";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class DashboardView extends React.Component {
  render() {
    const addRecordForm = <AddRecordForm />;
    const recordList = this.props.records ? (
      this.props.records.length > 0 ? (
        <RecordList recordsArray={this.props.records} />
      ) : (
        "No records"
      )
    ) : (
      <StyledLoadingSpinner />
    );
    return <LoggedUserTemplate header={addRecordForm} body={recordList} />;
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    records: state.firestore.ordered.records,
    auth: state.firebase.auth
  };
};
// export default compose(
//   connect(mapStateToProps),
//   firestoreConnect([{ collection: "records", limit: 30 }])
// )(DashboardView);

// var user = firebase.auth().currentUser;

// db.collection("stories")
//   .where("author", "==", user.uid)
//   .get();

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    if (!props.auth.uid) return [];
    return [{ collection: "records", where: [["user", "==", props.auth.uid]] }];
  })
)(DashboardView);
