import { FORBIDDEN, BAD_REQUEST } from "../api/HttpCodes";
import API from "../api/umbApi";
import { nothing, goTo } from "./generalActions";
import jwt from 'jwt-decode'

export const AUTHENTICATE = "AUTHENTICATE";
export const UN_AUTHENTICATE = "UN_AUTHENTICATE";
export const AUTHORIZATION_HEADER = "authorization";
export const SET_USER = "SET_USER";

export function authenticate(res) {
  var role = jwt(res.data.access.replace("Bearer ",""))["role"];
  return {
    type: AUTHENTICATE,
    token: "Bearer "+ res.data.access,
    role:role,
    refresh:res.data.refresh
  };
}
export function fakeauthenticate(token) {
  return {
    type: AUTHENTICATE,
    token: token
  };
}
export function unAuthenticateThenGoHome() {
  return dispatch => {
    dispatch(unAuthenticate());
    dispatch(goHome());
    return dispatch(nothing());
    
  };
}
export function setUser(user) {
  return {
    type: SET_USER,
    user: user
  };
}

export function checkAuthentication(token) {
  return {
    type: AUTHENTICATE,
    token: token
  };
}

export function addAuthentication() {
  return { headers: { Authorization:  typeof window !=="undefined"?localStorage.getItem("token"):""  } };
}

export function getMessageFromError(error,defaultMessage){
  if(error.response != null && error.response.data != null) {
      if(error.response.data.message != null) {
          return error.response.data.message
      }else if (error.response.data.errors != null){
          return error.response.data.errors.join(',');
      }
  }
  return defaultMessage;
}

export function isUnAuthenticated(error) {
  return error.message.includes(FORBIDDEN) || (error.status <= FORBIDDEN && error.status > BAD_REQUEST );
}
export function put(
  url,
  body,
  success = () => {},
  forbiddenError = () => {},
  generalError = () => {},
  needsAuth = false
) {
  return dispatch => {
    return API.put(url, body,  needsAuth ? addAuthentication() : { headers: {} })
      .then(res => {
        return success(dispatch, res);
      })
      .catch(error => {
        if (
          forbiddenError != undefined &&
          forbiddenError != null &&
          isUnAuthenticated(error)
        ) {
          dispatch(unAuthenticate());
          return forbiddenError(dispatch, error);
        }
        return generalError != undefined ? generalError(dispatch, error) : null;
      });
  };
}
export function deleteApi(
  url,
  body,
  success = () => {},
  forbiddenError = () => {},
  generalError = () => {},
) {
  return dispatch => {
    return API.delete(url,   {...addAuthentication(),...body} )
      .then(res => {
        return success(dispatch, res);
      })
      .catch(error => {
        if (
          forbiddenError != undefined &&
          forbiddenError != null &&
          isUnAuthenticated(error)
        ) {
          dispatch(unAuthenticate());
          return forbiddenError(dispatch, error);
        }
        return generalError != undefined ? generalError(dispatch, error) : null;
      });
  };
}

export function authPut(
  url,
  body,
  success = () => {},
  forbiddenError = () => {},
  generalError = () => {},
) {
  return dispatch => {
    dispatch(put(url, body, success, forbiddenError, generalError, true));
  };
}
export function refreshToken() {
  return dispatch => {
    if (userAuthenticated()) {
      return API.post("api/token/refresh/", {refresh:localStorage.getItem("refresh")})
        .then(res => {
          return dispatch(authenticate(res));
        })
        .catch(error => {
          if (isUnAuthenticated(error)) {
            return dispatch(unAuthenticate());
          }
        });
    } else {
      dispatch(unAuthenticate());
      return dispatch(nothing());
    }
  };
}

export function userAuthenticated() {
  return typeof window !=="undefined"&&localStorage.getItem("token")!=="";
}

export function post(
  url,
  body,
  success = null,
  forbiddenError = null,
  generalError = null,
  needsAuth = false
) {
  return dispatch => {
    return API.post(
      url,
      body,
      needsAuth ? addAuthentication() : { headers: {} }
    )
      .then(res => {
        return success(dispatch, res);
      })
      .catch(error => {
        if (
          forbiddenError != undefined &&
          forbiddenError != null &&
          isUnAuthenticated(error)
        ) {
          return forbiddenError(dispatch, error);
        }
        return generalError != undefined ? generalError(dispatch, error) : null;
      });
  };
}

export function authPost(
  url,
  body,
  success = null,
  forbiddenError = null,
  generalError = null
) {
  return dispatch => {
    dispatch(post(url, body, success, forbiddenError, generalError, true));
  };
}

export function get(
  url,
  success = null,
  forbiddenError = null,
  generalError = null,
  needsAuth = false
) {
  return  (dispatch) => {
    return  API.get(url, needsAuth ? addAuthentication() : { headers: {} })
      .then(res => {
        return success(dispatch, res);
      })
      .catch(error => {
        if (
          forbiddenError != undefined &&
          forbiddenError != null &&
          isUnAuthenticated(error)
        ) {
          return forbiddenError(dispatch, error);
        }
        return generalError != undefined ? generalError(dispatch, error) : null;
      });
  };
}
export function authGet(
  url,
  success = null,
  forbiddenError = null,
  generalError = null
) {
  return dispatch => {
    dispatch(refreshToken());
    dispatch(get(url, success, forbiddenError, generalError, true));
  };
}

export function goHome() {
  return dispatch=> {
    dispatch(goTo("/"));
  }
  
}

export async function fetch(url) {
  const result = await API.get(url);
  if (result.status >= 400 && result.status < 600) {
    throw new Error("Bad response from server");
  }
  return result.data;
}


export function unAuthenticate() {
  return { type: UN_AUTHENTICATE };
}
