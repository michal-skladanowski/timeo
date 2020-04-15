import React from "react";
import Project from "./Project";
import styled from "styled-components";

const StyledUl = styled.ul`
  padding: 0;
`;

const ProjectList = props => (
  <StyledUl>
    {props.projectsArray.map(project => {
      return <Project data={project} key={project.id} />;
    })}
  </StyledUl>
);

export default ProjectList;
