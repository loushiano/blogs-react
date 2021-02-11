import React from "react";
import { useDispatch } from "react-redux";
import { goTo } from "../actions/generalActions";

function ActiveLink(props) {

  const dispatch = useDispatch();
  const handleClick = e => {
    e.preventDefault();
    if (props.href == "function") {
      props.onClick();
    } else if (props.href == "nothing") {
    } else {
      dispatch(goTo(props.href));
    }
  };

  return (
    <a
      href={props.href}
      onClick={handleClick}
      className={props.className}
      style={props.style}
      style={{ position: "relative" }}
    >
      {props.component}
      <span style={props.spanStyle} >{props.text}</span>
    </a>
  );
}

export default ActiveLink;
