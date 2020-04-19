import React from "react";
import Header from "../Components/Header/Header";
import MenuSidebar from "../Components/MenuSidebar/MenuSidebar";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const StyledWraper = styled.div`
  padding-left: 200px;
  height: 100vh;
`;
const StyledDiv = styled.div`
  background-color: #f8f9fb;
  padding-top: 30px;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  height: calc(100% - 30px);
  display: flex;
  flex-direction: column;
`;

const LoggedUserTemplate = ({ header, body, auth }) => {
  return !auth.uid ? (
    <Redirect to="/login" />
  ) : (
    <StyledWraper>
      <MenuSidebar />
      <StyledDiv>
        <Header>{header}</Header>
        {body}
      </StyledDiv>
    </StyledWraper>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};
export default connect(mapStateToProps)(LoggedUserTemplate);
