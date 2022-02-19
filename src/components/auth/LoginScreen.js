import React from "react";
import { useDispatch } from "react-redux";
import { authStartLoginAction } from "../../actions/actions";
import { useForm } from "../../hooks/useForm";
import "./LoginScreen.css";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const [loginFormValues, handleInputChangeLoginForm] = useForm({
    loginEmail: "",
    loginPassword: "",
  });

  // const [RegisterFormValues, handleInputChangeRegisterForm, resetRegisterForm] =
  //   useForm({});

  const { loginEmail, loginPassword } = loginFormValues;

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(authStartLoginAction(loginEmail, loginPassword));
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleOnSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                value={loginEmail}
                onChange={handleInputChangeLoginForm}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="loginPassword"
                value={loginPassword}
                onChange={handleInputChangeLoginForm}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
