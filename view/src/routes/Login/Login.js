import "./Login.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../store/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (credentials) => {
    await dispatch(loginUser(credentials));
  };

  const loginSchema = Yup.object().shape({
    username: Yup.string().required("Username or email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must contain at least 8 characters, one letter, and one number"
      ),
  });

  return (
    <div className="login-container">
      <div className="login-form-title">
        <h1 className="login-form-head">Sign In</h1>
        <p className="login-form-alt">
          or <Link to="/auth/register">register a new account</Link>
        </p>
      </div>
      <Formik
        initialValues={{
          username: "",
          password: "",
          rememberMe: false,
        }}
        onSubmit={async (values) => {
          const { username, password } = values;
          await handleLogin({ username, password });
        }}
        validationSchema={loginSchema}
        validateOnBlur
      >
        <Form className="login-form">
          <div className="feild-container login-form-username">
            <label htmlFor="username" className="login-form-label">
              Username
            </label>
            <Field
              id="username"
              name="username"
              placeholder="Enter email or username"
              className="login-form-field"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="error-message"
            />
          </div>
          <div className="feild-container login-form-password">
            <label htmlFor="password" className="login-form-label">
              Password
            </label>
            <Field
              id="password"
              name="password"
              placeholder="Enter password"
              className="login-form-field"
              type={showPassword ? "text" : "password"}
            />
            <button
              className="showPassword-btn"
              type="button"
              onClick={toggleShowPassword}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
            <ErrorMessage
              name="password"
              component="div"
              className="error-message"
            />
          </div>
          <div className="login-form-rem-forgot">
            <label htmlFor="rememberMe">
              <Field type="checkbox" id="rememberMe" name="rememberMe" />
              Remember me
            </label>
            <Link to="/auth/forgot-password">Forgot Password?</Link>
          </div>
          <button type="submit" className="login-btn">
            Sign In
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
