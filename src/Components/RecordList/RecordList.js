import React, { useState } from "react";
import ListElement from "./ListElement";
import styled from "styled-components";
import List from "../../Components/atoms/List";
import StyledLoadingSpinner from "../../Components/Loader/Loader";
import { FaSort, FaAngleDoubleRight } from "react-icons/fa";
import { orderItems, loadMoreItems } from "../../store/actions/queryAction";
import { connect } from "react-redux";
import { useFirebase } from "react-redux-firebase";

const StyledWrapper = styled.div`
  margin: 30px 17px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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
const StyledListHeaderElement = styled.div`
  cursor: pointer;
  svg {
    vertical-align: center;
    margin-left: 3px;
    color: ${({ active }) => (active ? "black" : "lightgray")};
  }
`;
const StyledListFooter = styled.div`
  font-size: 0.8rem;
  color: grey;
  text-align: right;
  padding: 10px 20px 10px 0;
  background-color: white;
  div {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    padding-left: 20px;
    svg {
      padding-left: 5px;
    }
  }
`;

const NoRecords = styled.div`
  padding: 10px 0 10px 75px;
  background-color: white;
  text-align: center;
  font-size: 0.9rem;
  color: #636364;
`;

const RecordList = ({
  auth,
  type,
  headers,
  recordsArray,
  orderData,
  loadMore,
  currentQuery
}) => {
  const [querySize, setQuerySize] = useState(0);
  const firestore = useFirebase().firestore();
  firestore
    .collection("records")
    .where("user", "==", auth.uid)
    .get()
    .then(function(querySnapshot) {
      setQuerySize(querySnapshot.size);
    });

  return (
    <StyledWrapper>
      <StyledListHeader type={type}>
        {headers.map(header => {
          const orderObject = {
            orderBy: header[1],
            sortType: currentQuery.sortType === "asc" ? "desc" : "asc"
          };
          const active = currentQuery.orderBy === header[1] ? true : false;
          return (
            <StyledListHeaderElement
              key={header[0]}
              active={active}
              onClick={() => orderData(orderObject)}
            >
              {header[0]}
              <FaSort />
            </StyledListHeaderElement>
          );
        })}
      </StyledListHeader>
      <List>
        {recordsArray ? (
          recordsArray.length > 0 ? (
            <>
              {recordsArray.map(record => (
                <ListElement
                  data={record}
                  key={record.id}
                  grid={handleTemplateGrid(type)}
                  type={type}
                />
              ))}
              <StyledListFooter>
                1 - {recordsArray.length} of {querySize}
                {recordsArray.length < querySize && (
                  <div onClick={loadMore}>
                    load more <FaAngleDoubleRight />
                  </div>
                )}
              </StyledListFooter>
            </>
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    orderData: payload =>
      dispatch(orderItems({ view: ownProps.view, ...payload })),
    loadMore: () => dispatch(loadMoreItems(ownProps.view))
  };
};
const mapStateToProps = (state, ownProps) => {
  return {
    currentQuery: state.query[ownProps.view],
    auth: state.firebase.auth
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RecordList);
