import React, { useEffect, useState } from "react";
import "./announcements.css";
import rightArrow from "../assets/right-arrow-short.png";
import { Link } from "react-router-dom";
import { getCookie } from "./cookies.jsx";
import axios from "axios"; // Import Axios directly
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Announcements() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const accessToken = getCookie("accessToken"); // Get access token from cookie

  useEffect(() => {
    if (accessToken) {
      fetchFiles(accessToken);
    }
  }, [accessToken]); // Trigger useEffect when accessToken changes

  const fetchFiles = async (token) => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/drops/files`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      });
      setFiles(Array.isArray(response.data) ? response.data.reverse() : []);
    } catch (error) {
      toast.error("Error announcement details. Please try again.");
    } finally {
      setLoading(false);
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
