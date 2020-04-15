import React from "react";
import styled from "styled-components";
import moment from "moment";
import { connect } from "react-redux";
import { deleteProject } from "../../store/actions/projectsAction";

const StyledLi = styled.li`
  display: grid;
  grid-template-columns: 6fr 2fr 1fr;
  opacity: 1;
  animation-duration: 1000ms;
  animation-name: appears;
  font-size: 0.9rem;
  padding: 8px 75px;
  text-align: start;
  border-top: 1px solid lightgray;
`;

const Project = ({ data, deleteItem }) => {
  const { id, title, duration } = data;

  return (
    <StyledLi>
      <div>{title}</div>
      <div>
        {duration ? moment.utc(duration).format("HH:mm:ss") : "00:00:00"}
      </div>
      <div>
        <button onClick={() => deleteItem(id)}>x</button>
      </div>
    </StyledLi>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    deleteItem: id => dispatch(deleteProject(id))
  };
};
export default connect(null, mapDispatchToProps)(Project);
