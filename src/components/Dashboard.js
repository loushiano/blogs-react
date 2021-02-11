import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
    setCurrentFilter, getFullUser,
  } from "../actions/profileActions";
  import PersonIcon from "@material-ui/icons/Person";
import CourseCatThree from "./CourseCatThree";
import Teachers from "./Teachers";
import Categories from "./Category";
export default function Dashboard() {

    const state = useSelector(state=>state.profileReducer);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getFullUser());
    },[])
  return (
    <div style={{ padding: "40px" }}>
      <div className="row">
        <div className="col-lg-3">
          <div
            className="course-details__content"
            style={{ marginTop: "30px" }}
          >
            <div
              className="tab-content course-details__tab-content"
              style={{ position: "relative", textAlign: "center" }}
            >
              <div className="circle_div">
                {state.fields.imageUrl.value == null ||
                state.fields.imageUrl.value == "" ? (
                  <PersonIcon
                    style={{
                      verticalAlign: "bottom",
                      fontSize: "80",
                      color: "#012237"
                    }}
                  />
                ) : (
                  <img
                    style={{ borderRadius: "50%" }}
                    src={
                      "data:image/jpg;base64, " + state.fields.imageUrl.value
                    }
                    width="150"
                    height="150"
                  />
                )}
              </div>
              <div style={{ textAlign: "left", marginTop: "50px" }}>
                <div
                  className={
                    state.currentFilter === "PROFILE"
                      ? "standards_filter_standard selected"
                      : "standards_filter_standard"
                  }
                  onClick={() => dispatch(setCurrentFilter("PROFILE"))}
                >
                  Profile
                </div>
              </div>
              <div style={{ textAlign: "left", marginTop: "50px" }}>
                <div
                  className={
                    state.currentFilter === "BLOGS"
                      ? "standards_filter_standard selected"
                      : "standards_filter_standard"
                  }
                  onClick={() => dispatch(setCurrentFilter("BLOGS"))}
                >
                  YOUR BLOGS
                </div>
              </div>
              <div style={{ textAlign: "left", marginTop: "50px" }}>
                <div
                  className={
                    state.currentFilter === "CATEGORIES"
                      ? "standards_filter_standard selected"
                      : "standards_filter_standard"
                  }
                  onClick={() => dispatch(setCurrentFilter("CATEGORIES"))}
                >
                  YOUR CATEGORIES
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-9">
            <div
              className="course-details__content"
              style={{ marginTop: "30px" }}
            >
              <div
                className="tab-content course-details__tab-content"
                style={{ position: "relative" }}
              >
                {getCurrentFilter(state, dispatch)}
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export function getCurrentFilter(state, dispatch) {
    switch (state.currentFilter) {
        case "BLOGS":
            return (<Teachers/>);
        case "CATEGORIES":
          return (<Categories/>)
      default:
        return profile(dispatch, state);
    }
  
}


function profile(state,dispatch){

    return(<div>hi</div>)

}