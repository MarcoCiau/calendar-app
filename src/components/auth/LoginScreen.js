import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { authStartLoginAction, authStartRegisterAction } from "../../actions/actions";
import { useForm } from "../../hooks/useForm";
import "./LoginScreen.css";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const [loginFormValues, handleInputChangeLoginForm] = useForm({
    loginEmail: "",
    loginPassword: "",
  });

  const [registerFormValues, handleInputChangeRegisterForm ] = useForm({
    registerEmail:"",
    registerName:"",
    registerPassword:"",
    registerDuplicatedPassword:"",
  });

  const { loginEmail, loginPassword } = loginFormValues;
  const { registerEmail, registerName, registerPassword, registerDuplicatedPassword } = registerFormValues;

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(authStartLoginAction(loginEmail, loginPassword));
  };

  const handleOnSubmitRegister = (e) => {
    e.preventDefault();
    if (registerPassword !== registerDuplicatedPassword)
    {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `The password are not equal`
      });
    }
    console.log("submit register");
    dispatch(authStartRegisterAction(registerName, registerEmail, registerPassword));
  }

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
          <form onSubmit={handleOnSubmitRegister}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="registerName"
                value={registerName}
                onChange={handleInputChangeRegisterForm}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="registerEmail"
                value={registerEmail}
                onChange={handleInputChangeRegisterForm}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="registerPassword"
                value={registerPassword}
                onChange={handleInputChangeRegisterForm}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="registerDuplicatedPassword"
                value={registerDuplicatedPassword}
                onChange={handleInputChangeRegisterForm}
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
