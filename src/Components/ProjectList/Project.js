import React from "react";

const Project = ({ data }) => {
  const { title } = data;

  return (
    <li>
      <div>{title}</div>
    </li>
  );
};

export default Project;
