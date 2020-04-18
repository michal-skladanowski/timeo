import Loader from "react-loader-spinner";
import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translateY(-50%);
  transform: translateX(-50%);
`;

const MainLoader = () => (
  <StyledWrapper>
    <Loader type="Watch" color="white" height={100} width={100} />
  </StyledWrapper>
);
export default MainLoader;
