import { combineReducers } from "redux";
import history from "../pages/history"
import loginReducer from "./loginReducer";
import authenticationReducer from "./autenticationReducer"
import blogsReducer from "./blogsReducer";
import profileReducer from "./profileReducer";
import DialogReducer from "./dialogReducer";
import { connectRouter } from 'connected-react-router/immutable';

export default combineReducers({
    router:connectRouter(history),
    auth:authenticationReducer,
    loginReducer,
    blogsReducer,
    profileReducer,
    DialogReducer
});