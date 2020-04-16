import styled from "styled-components";
import React from "react";

const StyledUl = styled.ul`
  padding: 0;
  margin: 0;
  border-radius: 10px;
  color: #373738;
`;
const StyledWrapper = styled.div`
  border-radius: 10px;
  overflow: hidden;
`;
const List = ({ children }) => (
  <StyledWrapper>
    <StyledUl>{children}</StyledUl>
  </StyledWrapper>
);
export default List;
