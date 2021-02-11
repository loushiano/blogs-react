import React,{useEffect} from "react";
import Select from "react-select";
import {useDispatch} from "react-redux";

export default function AppSelect(props) {
  const dispatch = useDispatch();

  return (
    <div>
      {props.label != undefined ? (
        <label style={{ display: "block",color:"black" }}>{props.label}</label>
      ) : null}
      <div id="title_select" className="appSelect">

        <Select
          id="title_select"
          className={
            props.field.validation == "invalid"
              ? "appSelect redBox "
              : "appSelect grayBox "
          }
          onChange={(event) => (props.noRedux==undefined||!props.noRedux)?dispatch(props.handleChange(event)):props.handleChange(event)}
          value={
            props.field.value != null
              ? props.options.find(
                  element => element.value == (props.useValueId?props.field.value.id:props.field.value)
                )
              : ""
          }
          options={props.options}
        />
      </div>
    </div>
  );
}
