import React from "react";
import demo from '../assets/Trial.jpg'
import "./Login.css";

const LoginPage = () => {
  return (
    <div id="Login-Container">
      <div className="Login-Wrapper">
        <div id="Side-Frame">
            <img id="sideframe-img" src={demo} alt="" />
        </div>
        <div className="auth-wrapper">
          <div className="auth-main">
            <input type="checkbox" id="auth-toggle" aria-hidden="true" />

            <div className="auth-login-form">
              <form>
                <label htmlFor="auth-toggle" aria-hidden="true">
                  Login
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="User name"
                  required
                />
                <input type="email" name="email" placeholder="Email" required />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
                <button>Sign up</button>
              </form>
            </div>

            <div className="auth-instructions">
              <form>
                <label htmlFor="auth-toggle" aria-hidden="true">
                  Instructions
                </label>
                <input type="email" name="email" placeholder="Email" required />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
                <button>Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
