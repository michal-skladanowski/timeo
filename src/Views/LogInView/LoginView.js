import React from "react";
import UnloggedUserTemplate from "../../Templates/UnloggedUserTemplate";
import { Formik, Form, Field } from "formik";
import { signIn } from "../../store/actions/authAction";
import { connect } from "react-redux";
import styled from "styled-components";
import logo from "../../assets/logo.png";

const StyledWrapper = styled.div`
  margin: auto;
  display: flex;
  width: 400px;
  height: 300px;
  position: absolute;
  top: 50%;
  margin-top: -150px;
  margin-left: -200px;
  left: 50%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const StyledForm = styled(Form)`
  width: 400px;
  padding: 25px 50px;
  display: flex;
  flex-direction: column;
  background-color: white;
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
  margin: 0 auto;
`;
const StyledLogo = styled.img`
  display: block;
  margin-bottom: 20px;
`;
const LoginView = ({ children, signIn }) => {
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
            signIn(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <StyledForm>
              <Field as={StyledInput} type="email" name="email" />
              {/* <ErrorMessage name="email" component="div" /> */}
              <Field as={StyledInput} type="password" name="password" />
              {/* <ErrorMessage name="password" component="div" />*/}
              <StyledButton type="submit" disabled={isSubmitting}>
                Log In
              </StyledButton>
            </StyledForm>
          )}
        </Formik>
      </StyledWrapper>
    </UnloggedUserTemplate>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds))
  };
};
export default connect(null, mapDispatchToProps)(LoginView);
