import React, { useState, useContext } from "react";
import ListElement from "./ListElement";
import styled from "styled-components";
import List from "../../Components/atoms/List";
import StyledLoadingSpinner from "../../Components/Loader/Loader";
import { FaSort, FaAngleDoubleRight } from "react-icons/fa";
import { orderItems, loadMoreItems } from "../../store/actions/queryAction";
import { connect } from "react-redux";
import ProjectContext from "../../contex/projectContext";

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
  loadMore,
  currentQuery,
  user
}) => {
  const [sortKey, setSortKey] = useState("createdAt");
  const [currentSortType, setSortType] = useState("desc");
  let itemsCount = 0;
  const project = useContext(ProjectContext);
  switch (type) {
    case "record":
      itemsCount = user && user[0].recordsCount;

      break;
    case "project":
      itemsCount = project && project.itemsCount;
      break;
    case "projects":
      itemsCount = user && user[0].projectsCount;
      break;
    default:
      break;
  }

  const sortFunc = (a, b) => {
    console.log("sortFunc wywołana z", currentSortType, sortKey, recordsArray);
    if (currentSortType === "asc") {
      if (a[sortKey] < b[sortKey]) return -1;
      else if (a[sortKey] > b[sortKey]) return 1;
      return 0;
    } else if (currentSortType === "desc") {
      if (a[sortKey] < b[sortKey]) return 1;
      else if (a[sortKey] > b[sortKey]) return -1;
      return 0;
    }
  };

  return (
    <StyledWrapper>
      <StyledListHeader type={type}>
        {headers.map(header => {
          const orderObject = {
            orderBy: header[1],
            sortType: currentSortType === "asc" ? "desc" : "asc"
          };
          const active = sortKey === header[1] ? true : false;
          return (
            <StyledListHeaderElement
              key={header[0]}
              active={active}
              onClick={() => {
                setSortKey(orderObject.orderBy);
                setSortType(orderObject.sortType);
                console.log(currentSortType, sortKey);
              }}
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
              {[...recordsArray].sort(sortFunc).map(record => (
                <ListElement
                  data={record}
                  key={record.id}
                  grid={handleTemplateGrid(type)}
                  type={type}
                />
              ))}
              <StyledListFooter>
                {recordsArray.length} of {itemsCount}
                {recordsArray.length < itemsCount && (
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
    auth: state.firebase.auth,
    user: state.firestore.ordered.users
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RecordList);
