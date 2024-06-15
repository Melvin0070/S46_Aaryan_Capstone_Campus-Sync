import React, { useEffect, useState } from "react";
import axios from "axios";
import "./announcements.css";
import rightArrow from "../assets/right-arrow-short.png";
import { Link } from "react-router-dom";

function Announcements() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/drops/files"
      );
      setFiles(Array.isArray(response.data) ? response.data.reverse() : []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
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
