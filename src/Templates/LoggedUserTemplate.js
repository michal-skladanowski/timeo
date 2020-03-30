import React from "react";
import Header from "../Components/Header/Header";
import MenuSidebar from "../Components/MenuSidebar/MenuSidebar";
import styled from "styled-components";

const StyledWraper = styled.div`
display: grid;
    grid-template-columns: 1fr 5fr;
}
`;
const LoggedUserTemplate = ({ header, body }) => {
  return (
    <StyledWraper>
      <MenuSidebar />
      <div>
        <Header>{header}</Header>
        {body}
      </div>
    </StyledWraper>
  );
};
export default LoggedUserTemplate;
