import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../Components/cookies";
import sideframe from "../assets/side-frame.jpg";
import loginLogo from "../assets/login-logo.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/login`,
        { ID: password } // Send only ID, as required by the backend
      );
      if (response.data && response.data.accessToken) {
        setCookie("username", username, 1);
        setCookie("email", email, 1);
        setCookie("accessToken", response.data.accessToken, 1); // Store accessToken in cookies

        toast.success("Login successful! Redirecting to home...", {
        });
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } else {
        toast.error("Error logging in user. Please try again.", {
        });
      }
    } catch (error) {
      toast.error("ID number does not match any existing user.", {
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="Login-Container">
      <img id="login-logo" src={loginLogo} alt="Login Logo" />
      <div className="Login-Wrapper">
        <div id="Side-Frame">
          <img id="sideframe-img" src={sideframe} alt="Side Frame" />
          <div className="sideframe-label">
            <p># One Platform For All</p>
          </div>
        </div>
        <div className="auth-wrapper">
          <div className="auth-main">
            <input type="checkbox" id="auth-toggle" aria-hidden="true" />
            <div className="auth-login-form">
              <form onSubmit={handleLogin}>
                <label htmlFor="auth-toggle" aria-hidden="true">
                  Login
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="User Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="ID Number"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit" disabled={loading}>
                  {loading ? "Loading..." : "Login"}
                </button>
              </form>
            </div>
            <div className="auth-instructions">
              <label htmlFor="auth-toggle" aria-hidden="true">
                User Guide
              </label>
              <div className="user-guide">
                <p id="instruct-1">
                  <span>1.</span> Thank you for testing our website! To get started, use one
                  of the following User IDs for login:
                </p>
                <ul>
                  <li>ADMN2004</li>
                  <li>ADMN2005</li>
                  <li>ADMN2006</li>
                  <li>ADMN2007</li>
                  <li>ADMN2008</li>
                </ul>
                <p className="highlight">
                  Only these User IDs will grant access during the beta phase.
                  Using any other ID won't allow login.
                </p>
                <p id="instruct-2">
                <span>2.</span> While you can use your own username and email to login,
                  features are limited to the provided User IDs, as they are
                  pre-verified in our database.
                </p>
                <p id="instruct-3">
                <span>3.</span> We are working to integrate a secured signup process and Faculty Dashboard for smooth data upload. Your feedback
                  during this testing phase is valuable!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
