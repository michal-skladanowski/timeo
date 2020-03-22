import React from 'react';
import Header from '../../Components/Header/Header';
import AddRecordForm from '../../Components/AddRecordForm/AddRecordForm';
import RecordList from '../../Components/RecordList/RecordList';

 class AddRecordView extends React.Component {
    state = {
        recordsArray : []
    }
    addRecord = (newItem, input) => {
        input.reset();
      this.setState(prevState => ({
      recordsArray: [...prevState.recordsArray, newItem],
    }));
    }
    render(){
        
        return(
            <>
            <Header>
                <AddRecordForm addRecord={this.addRecord}/>
            </Header>
            <RecordList recordsArray={this.state.recordsArray}/>
            </>
        )
    }
 }

 export default AddRecordView;