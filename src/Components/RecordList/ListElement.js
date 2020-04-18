import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
import { deleteRecord } from "../../store/actions/recordsAction";
import { deleteProject } from "../../store/actions/projectsAction";
import { FaTrashAlt } from "react-icons/fa";
import IconButton from "../atoms/IconButton";
import styled, { keyframes } from "styled-components";

const StyledDiv = styled.div`
  justify-self: center;
`;
const CreatedAt = styled.div`
  font-size: 0.8rem;
  color: #636364;
`;
const appears = keyframes`
from {
      opacity: 0%;
    }

    to {
      opacity: 100%;
    }
`;
const StyledWrapper = styled.ul`
  display: grid;
  grid-template-columns: ${({ grid }) => {
    return grid;
  }};
  opacity: 1;
  animation-duration: 1000ms;
  animation-name: ${appears};
  font-size: 0.9rem;
  padding: 8px 0 8px 75px;
  text-align: start;
  margin-bottom: 3px;
  background-color: white;
  &:last-child {
    margin-bottom: 0;
  }
`;

const ListElement = ({ data, type, deleteRecord, deleteProject, grid }) => {
  const projectId = type === "projects" ? data.id : data.project.id;
  const projectTitle = type === "projects" ? data.title : data.project.title;
  const projectUrl = "/projects/" + projectId;
  const deleteItem =
    type === "record" || type === "project"
      ? () => {
          deleteRecord(data);
        }
      : type === "projects"
      ? () => {
          deleteProject(data.id);
        }
      : null;

  return (
    <StyledWrapper grid={grid}>
      {type === "record" || type === "project" ? (
        <>
          <CreatedAt>{moment(data.createdAt.toDate()).fromNow()}</CreatedAt>
          <div>{data.description}</div>
        </>
      ) : null}
      {type === "projects" || type === "record" ? (
        <div>
          <Link to={projectUrl}> {projectTitle}</Link>
        </div>
      ) : null}

      <div>{moment.utc(data.duration).format("HH:mm:ss")}</div>
      <StyledDiv>
        <IconButton onClick={() => deleteItem(data.id)}>
          <FaTrashAlt />
        </IconButton>
      </StyledDiv>
    </StyledWrapper>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    deleteRecord: id => dispatch(deleteRecord(id)),
    deleteProject: id => dispatch(deleteProject(id))
  };
};
export default connect(null, mapDispatchToProps)(ListElement);
