import {
  VALIDATE_LOGIN,
  HANDLE_CHANGE_LOGIN,
  LOGIN_ERROR_HAPPENED
} from "../actions/loginActions.js";

const initialState = {
  fields: {
    username: {
      value: "",
      validation: "",
      mandatory: true
    },
    password: {
      value: "",
      validation: "",
      mandatory: true
    }
  },
  errorMessage:""
};

export default function loginReducer(state = initialState, action) {
  var newState = { ...state };
  switch (action.type) {
    case VALIDATE_LOGIN:
      Object.keys(newState.fields).map(element => {
        element = action.fields[element];
      });
      newState.errorMessage="please fill in all the required fields"
      return newState;
    case HANDLE_CHANGE_LOGIN:
      newState.fields[action.name] = action.field;
      return newState;
    case LOGIN_ERROR_HAPPENED:
      newState.errorMessage = action.message;
      return newState;
    default:
      return newState;
  }
}
