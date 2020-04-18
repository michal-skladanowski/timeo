import React from "react";
import ListElement from "./ListElement";
import styled from "styled-components";
import List from "../../Components/atoms/List";
import StyledLoadingSpinner from "../../Components/Loader/Loader";

const StyledWrapper = styled.div`
  margin: 30px 17px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0px 12px 5px rgba(60, 64, 67, 0.05);
`;

const handleTemplateGrid = type => {
  switch (type) {
    case "record":
      return "1fr 1.5fr 1fr 0.5fr 0.3fr";
    case "projects":
      return "4fr 1fr 1fr";
    case "project":
      return "1fr 1.5fr 0.5fr 0.3fr";
    default:
      return null;
  }
};
const StyledListHeader = styled.div`
  display: grid;
  grid-template-columns: ${({ type }) => {
    return handleTemplateGrid(type);
  }};

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

const RecordList = ({ type, headers, recordsArray }) => {
  return (
    <StyledWrapper>
      <StyledListHeader type={type}>
        {headers.map(header => (
          <div key={header}>{header}</div>
        ))}
      </StyledListHeader>
      <List>
        {recordsArray ? (
          recordsArray.length > 0 ? (
            recordsArray.map(record => {
              return (
                <ListElement
                  data={record}
                  key={record.id}
                  grid={handleTemplateGrid(type)}
                  type={type}
                />
              );
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
};

export default RecordList;
