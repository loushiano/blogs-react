import {
  authenticate,
  post,
  getMessageFromError,
  userAuthenticated
} from "./authorizationActions";
import { goTo } from "./generalActions";

//import Login from "../pages/auth/Login";

export const VALIDATE_LOGIN = "VALIDATE_LOGIN";
export const HANDLE_CHANGE_LOGIN = "HANDLE_CHANGE_LOGIN";
export const SAVE_HAEDER = "SAVE_HEADER";
export const LOGIN_ERROR_HAPPENED = "LOGIN_ERROR_HAPPENED";

export function isValid(fields, exclude = "") {
  var hasError = false;
  Object.keys(fields).map(element => {
    if (
      (fields[element].value == "" &&
        fields[element].mandatory &&
        element != exclude) ||
      fields[element].validation === "invalid"
    ) {
      fields[element].validation = "invalid";
      hasError = true;
    }
  });
  return !hasError;
}

export function validate(fields) {
  return { type: VALIDATE_LOGIN, fields: fields };
}
export function handleChange(value, name) {
  var validation = value == "" ? "invalid" : "";
  return {
    type: HANDLE_CHANGE_LOGIN,
    field: {
      value: value,
      validation: validation
    },
    name: name
  };
}

export function loginErrorHappened(message) {
  return {
    type: LOGIN_ERROR_HAPPENED,
    message: message
  };
}

export function login(fields, after = null) {
  if (isValid(fields)) {
    fields = parametrizeFields(fields);
    return dispatch => {
      return dispatch(
        post(
          "/login",
          fields,
          (dispatch, res) => {
            dispatch(authenticate(res));
            if (after != null) {
              dispatch(goTo(after));
            }
          },
          (dispatch, authError) => {
            dispatch(
              loginErrorHappened(
                getMessageFromError(
                  authError,
                  "Your username or password is incorrect"
                )
              )
            );
          },
          (dispatch, error) => {}
        )
      );
    };
  } else {
    return dispatch => {
      dispatch(validate(fields));
    };
  }
}

export function parametrizeFields(fields) {
  var returnFields = {};
  Object.keys(fields).map(element => {
    if (element == "username") {
      returnFields["email"] = fields[element].value;
    }

    returnFields[element] = fields[element].value;
  });
  return returnFields;
}
