import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  margin: 0 17px;
  align-items: center;
  justify-content: center;
  height: 70px;
  box-shadow: 0 0px 12px 5px rgba(60, 64, 67, 0.05);
  background-color: white;
  border-radius: 10px;
`;

const Header = props => {
  return <StyledHeader>{props.children}</StyledHeader>;
};

export default Header;
