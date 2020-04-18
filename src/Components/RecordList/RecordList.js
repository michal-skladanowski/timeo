import React from "react";
import Record from "./Record";
import styled from "styled-components";
import List from "../../Components/atoms/List";
import StyledLoadingSpinner from "../../Components/Loader/Loader";

const StyledWrapper = styled.div`
  margin: 30px 17px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0px 12px 5px rgba(60, 64, 67, 0.05);
`;
const StyledListHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr 0.5fr 0.3fr;

  font-size: 0.9rem;
  font-weight: 500;
  padding: 10px 0 10px 75px;

  margin-bottom: 3px;
  background-color: white;
`;

const NoRecords = styled.div`
  padding: 10px 0 10px 75px;
  background-color: white;
  text-align: center;
  font-size: 0.9rem;
  color: #636364;
`;

const RecordList = props => (
  <StyledWrapper>
    <StyledListHeader>
      <div>Date</div>
      <div>Description</div>
      <div>Project</div>
      <div>Duration</div>
    </StyledListHeader>
    <List>
      {props.recordsArray ? (
        props.recordsArray.length > 0 ? (
          props.recordsArray.map(record => {
            return <Record data={record} key={record.id} />;
          })
        ) : (
          <NoRecords>No records</NoRecords>
        )
      ) : (
        <StyledLoadingSpinner />
      )}
    </List>
  </StyledWrapper>
);

export default RecordList;
