import React from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const StyledWraper = styled.div`
background-color: #051e34;
height: 100vh;
position:relative;
}
`;
const UnloggedUserTemplate = ({ children, auth }) => {
  return auth.uid ? (
    <Redirect to="/" />
  ) : (
    <StyledWraper>{children}</StyledWraper>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};
export default connect(mapStateToProps)(UnloggedUserTemplate);
