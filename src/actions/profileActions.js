 import { authGet, getMessageFromError } from './authorizationActions';
import { goTo } from './generalActions';

export const SET_CURRENT_FILTER = "SET_CURRENT_FILTER";
export const SET_FIELDS = "SET_FIELDS";
export const LOADING_PROFILE = "LOADING_PROFILE"
export const SET_PROFILE_ERROR = "SET_PROFILE_ERROR";

export function setFields(fields) {
    return {
        type: SET_FIELDS,
        fields: fields
    }
}

export function setCurrentFilter(filter){
    return {
        type: SET_CURRENT_FILTER,
        currentFilter: filter
    }
}

export function getFullUser(router){
    return dispatch => {
      dispatch(setLoading(true))
        dispatch(authGet("/profiles/profile",(dispatch,res)=>{
            dispatch(setLoading(false))
            return dispatch(setFields(res.data));
        },(dispatch,error)=>{
          dispatch(setLoading(false))
            return dispatch(goTo("/login"));
        },(dispatch,error)=>{
          dispatch(setErrorMessage(getMessageFromError(error,"Something wrong happened while trying to retrieve your information")));
          dispatch(setLoading(false));
        })
        )
    }
}

function setErrorMessage(message){
    return {
      type:SET_PROFILE_ERROR,
      message:message
    }
  
  }

  export function setLoading(loading) {
    return {
      type:LOADING_PROFILE,
      loading:loading
    }
  }
  