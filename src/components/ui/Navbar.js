import React from "react";

export const Navbar = ({onSubmitHandler}) => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">CalendarIO</span>
      <button className="btn btn-outline-danger" onClick={onSubmitHandler}>
        <i className="fas fa-sign-out-alt"> </i>
        <span> Salir</span>
      </button>
    </div>
  );
};
