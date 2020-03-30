import React from "react";
import RecordList from "../../Components/RecordList/RecordList";
import AddRecordForm from "../../Components/AddRecordForm/AddRecordForm";

import LoggedUserTemplate from "../../Templates/LoggedUserTemplate";

class DashboardView extends React.Component {
  state = {
    recordsArray: []
  };
  addRecord = (newItem, input) => {
    input.reset();
    this.setState(prevState => ({
      recordsArray: [newItem, ...prevState.recordsArray]
    }));
  };
  render() {
    const addRecordForm = <AddRecordForm addRecord={this.addRecord} />;
    const recordList = <RecordList recordsArray={this.state.recordsArray} />;
    return (
      <LoggedUserTemplate
        header={addRecordForm}
        body={recordList}
      ></LoggedUserTemplate>
    );
  }
}

export default DashboardView;
