import React from "react";
import "./FloatingBtn.css"
export const FloatingBtn = ({styleProp, icon, label, clickHandler}) => {
  return (
    <>
    <button className= {`btn ${styleProp}`}  onClick={clickHandler}>
      <i className={icon}></i>
      {label}
    </button>
    </>
  );
};
