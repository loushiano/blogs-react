import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleChange, login } from "../actions/loginActions";
import AppInput from "./AppInput";

const LoginForm = () => {
  const loginReducer = useSelector(state => state.loginReducer);
  const dispatch = useDispatch();
  return (
    <section className="login-wrapper">
      <div
        className="login-bg"
        style={{ backgroundImage: `url(/assets/images/login-b.jpeg)` }}
      ></div>

      <div className="login-content">
        <div className="login-content__inner">
          <div className="logo-box">
            <div className="logo text-center">
              <a href="/" title="SMG - LMS NextJs Template">
                <img
                  src="/assets/images/logo-dark-smg.png"
                  width="128"
                  className="main-logo"
                  alt="SMG - LMS Logo"
                  title="SMG - LMS Logo"
                />
              </a>
            </div>
          </div>
          <div style={{color:"red"}}>{loginReducer.errorMessage}</div>
          <form onSubmit={e => { e.preventDefault(); }}>
            <AppInput
              type="text"
              placeholder="Enter Email Address *"
              name="username"
              mandatory={true}
              onChange={event =>
                dispatch(handleChange(event.target.value, event.target.name))
              }
              validation={loginReducer.fields.username.validation}
            />
            <AppInput
              type="password"
              placeholder="Your Password *"
              name="password"
              mandatory={true}
              id="password"
              validation={loginReducer.fields.password.validation}
              onChange={event =>
                dispatch(handleChange(event.target.value, event.target.name))
              }
            />
            <p className="text-right">
              <a href="/forget-password">Forgot your password?</a>
            </p>
          </form>
          <button
            className="thm-btn form-button"
            onClick={() => dispatch(login(loginReducer.fields,'/'))}
            onKeyDown={() => dispatch(login(loginReducer.fields,'/'))}
          >
            Sign in
          </button>

          <p className="signup-link">
            New to SMG Learning Center? <a href="/register">Signup</a>
          </p>
          <p className="copyright-text">
            © copyright {new Date().getFullYear()} by novoprogInc.com
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
