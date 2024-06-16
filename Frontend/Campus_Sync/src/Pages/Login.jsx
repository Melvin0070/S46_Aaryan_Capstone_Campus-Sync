import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setCookie, getCookie, removeCookie } from "../Components/cookies";
import sideframe from "../assets/side-frame.jpg";
import loginLogo from "../assets/login-logo.png";
import './Login.css'

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
        { ID: password, username: username }
      );
      if (response.data) {
        setCookie("username", username, 1);
        setCookie("email", email, 1);
        setCookie("accessToken", response.data.accessToken, 1); // 1 day
        setCookie("refreshToken", response.data.refreshToken, 7); // 7 days

        navigate("/home");
        console.log("User exists, proceed with login");
      } else {
        console.log("ID number does not match any existing user.");
      }
    } catch (error) {
      console.error("Error logging in user:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const refreshToken = getCookie("refreshToken");
      if (!refreshToken) return;
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/token`,
        { refreshToken }
      );
      if (response.data) {
        setCookie("accessToken", response.data.accessToken, 1); // 1 day
      } else {
        console.error("Failed to refresh token");
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  useEffect(() => {
    const refreshTokenInterval = setInterval(() => {
      refreshToken();
    }, 8 * 1000); // Refresh token every 8 seconds (as access token expires in 10s)

    return () => clearInterval(refreshTokenInterval);
  }, []);

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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
