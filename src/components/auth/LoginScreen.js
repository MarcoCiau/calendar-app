import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authStartLoginAction } from "../../actions/actions";
import { useForm } from "../../hooks/useForm";
import "./Auth.css";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginFormValues, handleInputChangeLoginForm] = useForm({
    loginEmail: "",
    loginPassword: "",
  });
  const { loginEmail, loginPassword } = loginFormValues;
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(authStartLoginAction(loginEmail, loginPassword));
  };

  const handleSignupNow = (e) => {
    e.preventDefault();
    navigate("/signup", {
      replace: true,
    });
  };

  return (
    <div className="text-center container col-md-6 mx-auto col-lg-3">
      <div className=" mt-5 form-signin">
        <form onSubmit={handleOnSubmit}>
          <div className="home_text">
            <i className="fas fa-calendar fa-3x mb-3" />
            <h1 className="h3 mb-3 fw-normal">Welcome Back</h1>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="emailLogin"
              placeholder="name@example.com"
              name="loginEmail"
              value={loginEmail}
              onChange={handleInputChangeLoginForm}
            />
            <label for="emailLogin">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="passwordLogin"
              placeholder="Password"
              name="loginPassword"
              value={loginPassword}
              onChange={handleInputChangeLoginForm}
            />
            <label for="passwordLogin">Password</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
        </form>
        <p className="mt-3">
          No yet member?{" "}
          <button type="button" class="btn btn-link" onClick={handleSignupNow}>
            Signup Now
          </button>
        </p>
        <p className="mt-4 mb-3 text-muted">
          By clicking Sign in, you agree to the terms of use.
        </p>
      </div>
    </div>
  );
};
