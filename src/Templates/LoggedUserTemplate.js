import React from "react";
import Header from "../Components/Header/Header";
import MenuSidebar from "../Components/MenuSidebar/MenuSidebar";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const StyledWraper = styled.div`
  padding-left: 200px;
`;

const LoggedUserTemplate = ({ header, body, auth }) => {
  return !auth.uid ? (
    <Redirect to="/login" />
  ) : (
    <StyledWraper>
      <MenuSidebar />
      <div>
        <Header>{header}</Header>
        {body}
      </div>
    </StyledWraper>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};
export default connect(mapStateToProps)(LoggedUserTemplate);
