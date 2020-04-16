import React from "react";
import Record from "./Record";
import styled from "styled-components";
import List from "../../Components/atoms/List";

const StyledWrapper = styled.div`
  padding: 30px 17px;
`;

const RecordList = props => (
  <StyledWrapper>
    <List>
      {props.recordsArray.map(record => {
        return <Record data={record} key={record.id} />;
      })}
    </List>
  </StyledWrapper>
);

export default RecordList;
