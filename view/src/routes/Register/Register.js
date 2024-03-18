import "./Register.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../store/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { showUser } from "../../api/auth";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { error, status } = auth;

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const handleRegister = async(credentials) => {
    await dispatch(registerUser(credentials));
    navigate("/");
  };

  const registerSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must contain at least 8 characters, one letter, and one number"
      ),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please repeat your password"),
  });

  return (
    <div className="register-container">
      <div className="register-form-title">
        <h1 className="register-form-head">Create a new account</h1>
        <p className="register-form-alt">
          or <Link to="/auth/login">log in to your account</Link>
        </p>
      </div>
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          repeatPassword: "",
        }}
        onSubmit={async (values) => {
          const { repeatPassword, ...credentials } = values;
          await handleRegister(credentials);
        }}
        validationSchema={registerSchema}
        validateOnBlur
      >
        <Form className="register-form">
          <div className="feild-container register-form-email">
            <label htmlFor="email" className="register-form-label">
              Email
            </label>
            <Field
              id="email"
              name="email"
              placeholder="Enter email"
              className="register-form-field"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />
          </div>
          <div className="feild-container register-form-username">
            <label htmlFor="username" className="register-form-label">
              Username
            </label>
            <Field
              id="username"
              name="username"
              placeholder="Enter username"
              className="register-form-field"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="error-message"
            />
          </div>
          <div className="feild-container register-form-password">
            <label htmlFor="password" className="register-form-label">
              Password
            </label>
            <Field
              id="password"
              name="password"
              placeholder="Enter password"
              className="register-form-field"
              type={showPassword ? "text" : "password"}
            />
            <button
              className="showPassword-btn"
              type="button"
              onClick={toggleShowPassword}
              tabIndex="-1"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
            <ErrorMessage
              name="password"
              component="div"
              className="error-message"
            />
          </div>
          <div className="feild-container register-form-repeat-password">
            <label htmlFor="repeatPassword" className="register-form-label">
              Repeat Password
            </label>
            <Field
              id="repeatPassword"
              name="repeatPassword"
              placeholder="Repeat your password"
              className="register-form-field"
              type={showRepeatPassword ? "text" : "password"}
            />
            <button
              className="showPassword-btn"
              type="button"
              onClick={toggleShowRepeatPassword}
              tabIndex="-1"
            >
              {showRepeatPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
            <ErrorMessage
              name="repeatPassword"
              component="div"
              className="error-message"
            />
          </div>
          <button
            type="submit"
            className="register-btn"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Singing up..." : "Sign Up"}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
