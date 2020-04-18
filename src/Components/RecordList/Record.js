import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
import { deleteRecord } from "../../store/actions/recordsAction";
import { FaTrashAlt } from "react-icons/fa";
import ListElement from "../../Components/atoms/ListElements";
import IconButton from "../../Components/atoms/IconButton";
import styled from "styled-components";

const StyledDiv = styled.div`
  justify-self: center;
`;
const CreatedAt = styled.div`
  font-size: 0.8rem;
  color: #636364;
`;

const Record = ({ data, deleteItem }) => {
  const {
    id,
    createdAt,
    description,
    time,
    project = { title: "No project" }
  } = data;
  const projectUrl = "/projects/" + project.id;
  return (
    <ListElement>
      <CreatedAt>{createdAt && moment(createdAt.toDate()).fromNow()}</CreatedAt>
      <div>{description}</div>
      <div>
        <Link to={projectUrl}> {project.title}</Link>
      </div>
      <div>{time && moment.utc(time).format("HH:mm:ss")}</div>
      <StyledDiv>
        <IconButton onClick={() => deleteItem(id)}>
          <FaTrashAlt />
        </IconButton>
      </StyledDiv>
    </ListElement>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    deleteItem: id => dispatch(deleteRecord(id))
  };
};
export default connect(null, mapDispatchToProps)(Record);
