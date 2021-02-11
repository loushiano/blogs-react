import {SHOW_DIALOG,HANDLE_CLOSE,HAS_ERROR,DISABLE_BACKDROP,ENABLE_BACKDROP, SET_DIALOG_COMPONENT} from "../actions/dialogActions";
import React from "react";


const initialState  =  {
    open : false,
    component:(null),
    showFooter:true,
    title:"",
    errorMessage:"",
    backdrop:"true",
    okButton:"Ok",
    onSave:null,
    isTabs:true,
    tabs:null,
    showCancel:true
};

export default function DialogReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_DIALOG:
            return {
                ...state,
                open:true,
                component:action.component,
                showFooter:action.showFooter,
                title:action.title,
                errorMessage:"",
                backdrop:action.backdrop,
                onSave:action.onSave,
                okButton:action.okButton,
                isTabs:action.isTabs,
                tabs:action.tabs,
                showCancel:action.showCancel

            };
        case HANDLE_CLOSE:
            return {
                ...state,
                errorMessage:"",
                open:false
            };
        case HAS_ERROR:
            return {
                ...state,
                errorMessage:action.errorMessage
            }
        case DISABLE_BACKDROP:
            return {
                ...state,
                backdrop:"static"
            }
        case ENABLE_BACKDROP:
            return {
                ...state,
                backdrop:'true'
            }
        case SET_DIALOG_COMPONENT:
            return {
                ...state,
                component:action.component
            }
        default:
            return state;
    }
}