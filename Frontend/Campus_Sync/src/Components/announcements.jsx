import React, { useEffect, useState } from "react";
import axios from "axios";
import "./announcements.css";
import rightArrow from "../assets/right-arrow-short.png";
import { Link } from "react-router-dom";
import { getCookie, setCookie } from "./cookies.jsx";

function Announcements() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(getCookie("accessToken"));
  const refreshToken = getCookie("refreshToken");

  useEffect(() => {
    if (accessToken) {
      fetchFiles(accessToken);
    } else if (refreshToken) {
      refreshAccessTokenAndFetchFiles();
    }
  }, [accessToken]);

  const fetchFiles = async (token) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/drops/files`,
        {
          headers: {
            Authorization: token,
            RefreshToken: refreshToken,
          },
        }
      );
      setFiles(Array.isArray(response.data) ? response.data.reverse() : []);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        refreshAccessTokenAndFetchFiles();
      } else {
        console.error(error);
      }
    }
    setLoading(false);
  };

  const refreshAccessTokenAndFetchFiles = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/token`,
        { refreshToken }
      );
      if (response.data && response.data.accessToken) {
        const newAccessToken = response.data.accessToken;
        setCookie("accessToken", newAccessToken, 1); // Update access token in cookies
        setAccessToken(newAccessToken); // Update access token in state
        fetchFiles(newAccessToken); // Retry fetching files with new access token
      } else {
        console.error("Failed to refresh token");
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  return (
    <div>
      <div id="announcements-heading">Announcements</div>
      <div id="announce-divs">
        {loading ? (
          <div className="announcement-div">
            <p className="Drop-Topics">Loading...</p>
          </div>
        ) : files.length > 0 ? (
          files.slice(0, 3).map((file, index) => (
            <Link to="/drops" className="link-tag" key={file._id}>
              <div key={index} className="announcement-div">
                <div id="drop-container">
                  <p>
                    {file.topic.substring(0, 40)}
                    {index === 0 && (
                      <span className="highlight-latest">NEW!</span>
                    )}
                  </p>
                  <img src={rightArrow} alt="right-arrow" />
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="announcement-div">
            <p className="Drop-Topics">No Drop Yet ...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Announcements;
