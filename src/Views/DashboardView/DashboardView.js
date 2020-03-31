import React from "react";
import RecordList from "../../Components/RecordList/RecordList";
import AddRecordForm from "../../Components/AddRecordForm/AddRecordForm";
import LoggedUserTemplate from "../../Templates/LoggedUserTemplate";
import { connect } from "react-redux";

class DashboardView extends React.Component {
  state = {
    recordsArray: []
  };
  // addRecord = (newItem, input) => {
  //   input.reset();
  //   this.setState(prevState => ({
  //     recordsArray: [newItem, ...prevState.recordsArray]
  //   }));
  // };
  render() {
    console.log(this.props);
    const addRecordForm = <AddRecordForm />;
    const recordList = <RecordList recordsArray={this.props.records} />;
    return <LoggedUserTemplate header={addRecordForm} body={recordList} />;
  }
}
const mapStateToProps = state => {
  return {
    records: state.record.records
  };
};
export default connect(mapStateToProps)(DashboardView);
