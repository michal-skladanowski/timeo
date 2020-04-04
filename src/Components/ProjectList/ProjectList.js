import React from "react";
import Project from "./Project";

const ProjectList = props => (
  <ul>
    {props.projectsArray.map(project => {
      return <Project data={project} key={project.id} />;
    })}
  </ul>
);

export default ProjectList;
