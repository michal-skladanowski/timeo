import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
import { deleteProject } from "../../store/actions/projectsAction";
import { FaTrashAlt } from "react-icons/fa";
import ListElement from "../../Components/atoms/ListElements";
import IconButton from "../../Components/atoms/IconButton";
import styled from "styled-components";

const StyledListElement = styled(ListElement)`
  grid-template-columns: 4fr 7fr 1fr;
`;

const Project = ({ data, deleteItem }) => {
  const { id, title, duration } = data;
  const projectUrl = "/projects/" + id;
  return (
    <StyledListElement>
      <div>
        <Link to={projectUrl}> {title}</Link>
      </div>
      <div>
        {duration ? moment.utc(duration).format("HH:mm:ss") : "00:00:00"}
      </div>
      <div>
        <IconButton onClick={() => deleteItem(id)}>
          <FaTrashAlt />
        </IconButton>
      </div>
    </StyledListElement>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    deleteItem: id => dispatch(deleteProject(id))
  };
};
export default connect(null, mapDispatchToProps)(Project);
