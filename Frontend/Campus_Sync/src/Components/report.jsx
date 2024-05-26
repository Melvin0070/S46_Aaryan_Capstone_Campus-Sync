import React, { useState, useEffect } from "react";
import axios from "axios";
import "./report.css";

function Report() {
  const [id, setId] = useState("");
  const [concern, setConcern] = useState("");
  const [proposal, setProposal] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior and reloading the entire page

    // Check if ID and Concern are not empty
    if (!id.trim() || !concern.trim()) {
      alert("Please fill in all mandatory fields (ID and Concern)");
      return;
    }

    const reportData = {
      ID: id,
      issue: concern,
      proposal,
    };

    try {
      // Making a POST request
      const response = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/reports/create",
        reportData
      );

      if (response.status === 201) {
        alert("Report created successfully");
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error creating report:", error);
      alert("Internal server error");
    }
  };

  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_SERVER_URL + "/reports/details/ADMN2004")
      .then((response) => {
        setReportData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, reportData.length - 1)
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
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
