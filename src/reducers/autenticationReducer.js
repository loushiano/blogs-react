import {AUTHENTICATE,UN_AUTHENTICATE} from "../actions/authorizationActions"

const initialState = {
    token:"",
    loggedIn:false,
    refresh:"",
    user:{
        fname:"ali",
        lname:"fawaz",
    },
    role:""
}
export default function authenticationReducer(state = initialState, action){
    
        if (typeof window !=="undefined") {
            state.token = localStorage.getItem("token");
            state.loggedIn = localStorage.getItem("token") !=="";
            state.role = localStorage.getItem("role");
            state.refresh = localStorage.getItem("refresh");
        }
        switch (action.type) {
            case AUTHENTICATE:
                state.token=action.token;
                state.role= action.role;
                if (action.refresh) {
                    state.refresh = action.refresh;
                    localStorage.setItem("refresh",action.refresh);
                }
                
                if (typeof window!=="undefined"){
                    localStorage.setItem("token",action.token);
                    localStorage.setItem("role",action.role);
                }
                state.loggedIn = true;
                return state;
            case UN_AUTHENTICATE:
                state.token="";
                state.refresh="";
                state.role="";
                if (typeof window!=="undefined"){
                    localStorage.setItem("token","");
                    localStorage.setItem("role","");
                    localStorage.setItem("refresh","");
                }
                state.loggedIn=false;
                return state;
            default:
                return state;
        }
    }