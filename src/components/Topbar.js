import React, { useEffect } from 'react';
import {useDispatch,useSelector} from "react-redux";
import { goTo } from '../actions/generalActions';
import ActiveLink from './ActiveLink';
import { refreshToken } from '../actions/authorizationActions';

function Topbar() {
    useEffect(()=>{
        dispatch(refreshToken())
    },[])   
    const dispatch = useDispatch();
    const loggedIn = useSelector(state=>state.auth.loggedIn);
        return (
            <div className="topbar-one">
                <div className="container">
                    <div className="topbar-one__left">
                    </div>
                    <div className="topbar-one__right" >
                        <ActiveLink href="function" className="header-field" onClick={()=>dispatch(goTo(loggedIn?"dashboard":"/login"))} text={loggedIn?"Dashboard":"Login"}/>
                    </div>
                </div>
            </div>
        );
}

export default Topbar;