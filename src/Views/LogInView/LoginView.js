import React from "react";
import UnloggedUserTemplate from "../../Templates/UnloggedUserTemplate";
import { Formik, Form, Field } from "formik";
import { signIn, signUp } from "../../store/actions/authAction";
import { connect } from "react-redux";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const StyledWrapper = styled.div`
  margin: auto;
  display: flex;
  width: 400px;
  height: 333px;
  position: absolute;
  top: 20%;
  margin-left: -200px;
  left: 50%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #051e34;
`;
const StyledForm = styled(Form)`
  width: 400px;
  padding: 25px 50px;
  display: flex;
  flex-direction: column;
  background-color: white;
  text-align: left;
  border-radius: 15px;
  box-shadow: -5px 0 15px rgba(255, 255, 255, 0.1);
`;

const StyledInput = styled.input`
  margin-bottom: 20px;
  padding: 10px 20px;
  font-size: 1.08em;
  background-color: #fcfcfc;
  border: 1px solid lightgray;
  border-radius: 10px;
`;

const StyledButton = styled.button`
  background-color: #051e34;
  font-family: "Montserrat";
  color: white;
  font-size: 1.12em;
  padding: 10px 20px;
  width: 120px;
  border-radius: 10px;

  margin-bottom: 15px;
`;
const StyledLogo = styled.img`
  display: block;
  margin-bottom: 20px;
`;

const StyledHeading = styled.h1`
  margin-bottom: 20px;
`;
const LoginView = ({ children, signIn, signUp, match }) => {
  const { path } = match;
  return (
    <UnloggedUserTemplate>
      <StyledWrapper>
        <StyledLogo src={logo} />
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            path === "/login" ? signIn(values) : signUp(values);

            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <StyledForm>
              <StyledHeading>
                {path === "/login" ? "Sign in" : "Sign up"}
              </StyledHeading>
              <label htmlFor="email">Email Address</label>
              <Field as={StyledInput} type="email" name="email" />
              {/* <ErrorMessage name="email" component="div" /> */}
              <label htmlFor="password">Password</label>
              <Field as={StyledInput} type="password" name="password" />
              {/* <ErrorMessage name="password" component="div" />*/}
              <StyledButton type="submit" disabled={isSubmitting}>
                {path === "/login" ? "Sign in" : "Sign up"}
              </StyledButton>
              {path === "/login" ? (
                <Link to="/signup">Don't have an account? Sign up here</Link>
              ) : (
                <Link to="/login">Already have an account? Sign in here.</Link>
              )}
            </StyledForm>
          )}
        </Formik>
      </StyledWrapper>
    </UnloggedUserTemplate>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds)),
    signUp: creds => dispatch(signUp(creds))
  };
};
export default connect(null, mapDispatchToProps)(LoginView);
