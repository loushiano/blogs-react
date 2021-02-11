import { SET_FIELDS, SET_CURRENT_FILTER, SET_PROFILE_ERROR, LOADING_PROFILE } from "../actions/profileActions";

const initialState = {
  fields: {
    first_name: {
      value: "",
      validation: "",
      mandatory: true
    },
    last_name: {
      value: "",
      validation: "",
      mandatory: true
    },
    imageUrl: {
        value: "",
        validation: "",
        mandatory: true
      }
  },
  errorMessage: "",
  loading: false,
  currentFilter: "PROFILE"
};

export default function profileReducer(state = initialState, action) {
  var newState = { ...state };
  switch (action.type) {
    case SET_FIELDS:
      Object.keys(newState.fields).map(element => {
        newState.fields[element].value = action.fields[element];
        newState.fields[element].validation =
          newState.fields[element].value != null ||
          !newState.fields[element].mandatory
            ? "valid"
            : "invalid";
      });
      return newState;
    case SET_CURRENT_FILTER:
      newState.currentFilter = action.currentFilter;
      return newState;
    case SET_PROFILE_ERROR:
      newState.errorMessage = action.message;
      return newState;
    case LOADING_PROFILE:
      newState.loading = action.loading;
      return newState;
    default:
      return newState;
  }
}
