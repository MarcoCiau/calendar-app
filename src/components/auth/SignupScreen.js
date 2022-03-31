import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authStartRegisterAction } from "../../actions/actions";
import { useForm } from "../../hooks/useForm";
import "./Auth.css";

export const SignupScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerFormValues, handleInputChangeRegisterForm] = useForm({
    registerEmail: "",
    registerName: "",
    registerPassword: "",
  });

  const { registerEmail, registerName, registerPassword } = registerFormValues;

  const handleOnSubmitRegister = (e) => {
    e.preventDefault();
    dispatch(
      authStartRegisterAction(registerName, registerEmail, registerPassword)
    );
  };

  const handleSigninNow = () => {
    navigate("/login", {
      replace: true,
    });
  };

  return (
    <>
      <div className="container col-xl-10 col-xxl-8 px-4 py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-lg-7 text-center text-lg-start">
            <h1 className="display-4 fw-bold lh-1 mb-4 home_text">
              {" "}
              <i className="fas fa-calendar fa-lg home_text"></i> Calendar App
            </h1>
            <p className="col-lg-10 fs-4 home_text">
              A scheduling app to stay organized. You can create, edit and
              delete events in your calendar.
            </p>
          </div>
          <div className="col-md-10 mx-auto col-lg-5">
            <form
              className="p-4 p-md-5 border rounded-3 bg-light"
              onSubmit={handleOnSubmitRegister}
            >
              <div className="form-floating mb-3">
                <input
                  type="name"
                  className="form-control"
                  id="nameInputReg"
                  placeholder="Your name"
                  name="registerName"
                  value={registerName}
                  onChange={handleInputChangeRegisterForm}
                />
                <label for="nameInputReg">Your name</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="emailInputReg"
                  placeholder="name@example.com"
                  name="registerEmail"
                  value={registerEmail}
                  onChange={handleInputChangeRegisterForm}
                />
                <label for="emailInputReg">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="passwordInputReg"
                  placeholder="Password"
                  name="registerPassword"
                  value={registerPassword}
                  onChange={handleInputChangeRegisterForm}
                />
                <label for="passwordInputReg">Password</label>
              </div>

              <button className="w-100 btn btn-lg btn-primary" type="submit">
                Sign up
              </button>

              <hr className="my-4" />
              <p>
                Already a member?{" "}
                <button
                  type="button"
                  class="btn btn-link"
                  onClick={handleSigninNow}
                >
                  Signin Now
                </button>
              </p>

              <small className="text-muted">
                By clicking Sign up, you agree to the terms of use.
              </small>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
