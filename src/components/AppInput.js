import React from "react";


const invalid = {
  border: "1px solid red"
};
export default function AppInput(props) {

  return (
    <div>
        <span style={{color:"red"}}>{" "}{props.errorMessage}</span>
      <span className="nice-font">{" "}{props.hardLabel}</span>
      <input
        id={props.id}
        type={props.type == "password" ? "password" : props.type=="number"?props.type:"text"}
        style={props.validation == "invalid" ? invalid : {}}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onFocus={props.onFocus!=undefined?props.onFocus:null}
        onBlur={props.onBlur!=undefined?props.onBlur:null}
        placeholder={props.placeholder!=undefined?props.placeholder:props.label}
      ></input>
    </div>
  );
}
