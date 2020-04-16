import React from "react";
import Project from "./Project";
import List from "../../Components/atoms/List";
import styled from "styled-components";

const StyledWrapper = styled.div`
  padding: 30px 17px;
`;

const ProjectList = props => (
  <StyledWrapper>
    <List>
      {props.projectsArray.map(project => {
        return <Project data={project} key={project.id} />;
      })}
    </List>
  </StyledWrapper>
);

export default ProjectList;
