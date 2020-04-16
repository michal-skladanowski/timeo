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
      <div>{createdAt && moment(createdAt.toDate()).fromNow()}</div>
      <div>{description}</div>
      <div>
        <Link to={projectUrl}> {project.title}</Link>
      </div>
      <StyledDiv>{time && moment.utc(time).format("HH:mm:ss")}</StyledDiv>
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
