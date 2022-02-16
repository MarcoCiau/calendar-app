import React from "react";
import "./FloatingBtn.css"
export const FloatingBtn = ({style, icon, label, clickHandler}) => {
  return (
    <>
    <button className= {`btn ${style}`}  onClick={clickHandler}>
      <i className={icon}></i>
      {label}
    </button>
    </>
  );
};
