import React, { useEffect, useState } from "react";
import AppInput from "./AppInput";
import { useDispatch } from "react-redux";
import AppSelect from "./AppSelect";
import { handleClose } from "../actions/dialogActions";

export default function AppForm(props) {
  const dispatch = useDispatch();
  const [state, setState] = useState({ fields: {}, errorMessage: "" });
  useEffect(() => {
    var fields = {};
    props.names.map((item, key) => {
      let field = {
        value: item.value != undefined ? item.value : "",
        validation: item.validation,
        lable: item.lable,
        mandatory: item.mandatory,
        type: item.type,
        fileType: item.fileType ? item.fileType : "PDF",
        purpose: item.purpose,
        jsonDisplay: item.jsonDisplay,
        onBack: item.onBack,
        hardLabel: item.hardLabel,
        options: item.options
      };
      fields[item.name] = field;
    });
    setState({ ...state, fields: fields });
  }, []);

  function handleChange(target, value) {
    let newState = { ...state };
    newState.fields[target].value = value;
    newState.fields[target].validation = "";
    setState(newState);
  }
  function handleSubmit(after) {
    var hasError = false;
    let fields = state.fields;
    var errorMessage = "Please Fill In All Inputs";
    Object.keys(fields).map(element => {
      if (
        (fields[element].value == "" && fields[element].mandatory) ||
        fields[element].validation === "invalid"
      ) {
        fields[element].validation = "invalid";
        hasError = true;

      }
    });
    setState({ ...state, fields: fields });

    if (props.extraValidation !=undefined) {
      hasError = props.extraValidation(state.fields);
      errorMessage = props.extraValidationMessage;
    }

    if (!hasError) {
      dispatch(handleClose())
      after(state.fields);
    } else {
      setState({ ...state, errorMessage: errorMessage });
    }
  }

  function changeFieldType(name, type) {
    let newState = { ...state };
    newState.fields[name].fileType = type;
    setState(newState);
  }
  function handleDelete(onDelete) {
    onDelete();
  }

  return (
    <div
      className="login-wrapper"
      style={{
        minHeight:
          props.minHeight != undefined && props.minHeight != ""
            ? props.minHeight
            : "0px"
      }}
    >
      <div style={{ color: "red" }}>{state.errorMessage}</div>
      <form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        {Object.keys(state.fields).map(element =>
          state.fields[element].type == "text" ||
          state.fields[element].type == "number" ? (
            <AppInput
              label={state.fields[element].lable}
              value={state.fields[element].value}
              type={state.fields[element].type}
              name={element}
              validation={state.fields[element].validation}
              hardLabel={state.fields[element].hardLabel}
              onChange={(event) =>
                handleChange(event.target.name, event.target.value)
              }
              key={element}
            />
          ) : state.fields[element].type == "file" ? (
            <div className="item" key={element}>
              <div className="course-one__single color-1">
                <div
                  className="course-one__content"
                  style={{
                    borderTop: "2px solid #f1f1f1",
                    paddingTop: "10px",
                    paddingBottom: "10px"
                  }}
                >
                  <span className="nice-font">
                    {state.fields[element].lable}
                  </span>
                  <br></br>
                  <input
                    type="file"
                    name={element}
                    accept={
                      state.fields[element].fileType == "CSV"
                        ? ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.xls"
                        : state.fields[element].fileType == "PDF"
                        ? "application/pdf"
                        : state.fields[element].fileType == "IMAGE"
                        ? "image/x-png,image/gif,image/jpeg"
                        : "video/*"
                    }
                    onChange={event =>
                      handleChange(event.target.name, event.target.files[0])
                    }
                  />
                  {state.fields[element].value != "" &&
                  state.fields[element].jsonDisplay ? (
                    <button onClick={state.fields[element].jsonDisplay}>
                      Check Uploaded File
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          ) : state.fields[element].type == "select" ? (
            <AppSelect
              key={element}
              label={state.fields[element].hardLabel}
              options={state.fields[element].options}
              field={state.fields[element]}
              handleChange={event =>
                handleChange(
                  element,
                  state.fields[element].options.find(
                    element => element.value == event.value
                  ).value
                )
              }
              noRedux={true}
            />
          ) : state.fields[element].type == "textArea"? (
            <div style={{ marginTop: "15px" }}>
              {" "}
              <span className="nice-font">{state.fields[element].hardLabel}</span>
              <textarea
                name={element}
                id="instructions"
                style={
                  state.fields[element].validation == "invalid"
                    ? { border: "1px solid red" }
                    : {}
                }
                value={state.fields[element].value}
                onChange={event =>
                  handleChange(event.target.name, event.target.value)
                }
              ></textarea>
            </div>
          ):null
        )}
      </form>
      <button
        className="thm-btn form-button"
        onClick={() => handleSubmit(fields => props.onSubmit(fields))}
      >
        {props.submit}
      </button>
      {props.delete != undefined && props.delete != "" ? (
        <button
          className="thm-btn form-button"
          style={{ marginTop: "15px", backgroundColor: "red" }}
          onClick={() => handleDelete(fields => props.onDelete(fields))}
        >
          {props.delete}
        </button>
      ) : null}
    </div>
  );
}
