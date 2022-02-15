import React from "react";
import "./FloatingBtn.css"
export const FloatingBtn = ({clickHandler}) => {
  return (
    <>
    <button className="btn btn-primary fab " onClick={clickHandler}>
      <i className="fas fa-plus"></i>
    </button>
    </>
  );
};
