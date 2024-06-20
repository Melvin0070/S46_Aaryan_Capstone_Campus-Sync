import React, { useState, useEffect } from "react";
import axios from "axios";
import "./report.css";
import { getCookie } from './cookies'; 
import { jwtDecode } from "jwt-decode";

function Report() {
  const [id, setId] = useState("");
  const [concern, setConcern] = useState("");
  const [proposal, setProposal] = useState("");
  const [reportData, setReportData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const token = getCookie("accessToken"); // Retrieve token from cookies

  useEffect(() => {
    fetchReportDetails();
  }, [token]); // Fetch report details whenever token changes

  const fetchReportDetails = () => {
    if (!token) {
      console.error("Token not found in cookies");
      return;
    }

    try {
      const decodedToken = jwtDecode(token); // Decode token to get user ID
      const userID = decodedToken.ID;

      axios
        .get(import.meta.env.VITE_SERVER_URL + `/reports/details/${userID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setReportData(response.data.reverse());
        })
        .catch((error) => {
          console.error("Error fetching reports:", error);
        });
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      console.error("Token not found in cookies");
      return;
    }

    try {
      const decodedToken = jwtDecode(token); // Decode token to get user ID
      const userID = decodedToken.ID;

      const reportData = {
        ID: id,
        issue: concern,
        proposal,
      };

      const response = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/reports/create",
        reportData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Report created successfully");
        fetchReportDetails();
        setId("");
        setConcern("");
        setProposal("");
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error creating report:", error);
      alert("Internal server error");
    }
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, reportData.length - 1)
    );
  };

  if (!reportData) {
    return <div className="loading-div">Loading...</div>;
  }

  const prevReport = reportData[currentIndex];

  return (
    <div id="reports-section">
      <div id="report-div">
        <div id="report-heading">Report an Issue</div>
        <form onSubmit={handleSubmit}>
          <div id="report-details">
            <p>Your ID *</p>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <p>Your concern *</p>
            <textarea
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
            />
            <p>Proposals (if any)</p>
            <input
              type="text"
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
            />
          </div>
          <div id="report-button-div">
            <button type="submit" className="report-button">
              Report
            </button>
          </div>
        </form>
      </div>
      <div id="past-reports-div">
        <div className="report-controll-buttons">
          <button onClick={handlePrevClick} disabled={currentIndex === 0}>
            {"<"}
          </button>
        </div>
        <div id="past-reports">
          <div id="report-div-heading">Previous Reports</div>
          <div id="past-reports-white">
            <p>
              Concern: <span>{prevReport.issue}</span>
            </p>
            <p>
              Solution:{" "}
              <span>
                {prevReport.solution ? prevReport.solution : "Pending..."}
              </span>
            </p>
          </div>
        </div>
        <div className="report-controll-buttons">
          <button
            onClick={handleNextClick}
            disabled={currentIndex === reportData.length - 1}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Report;
