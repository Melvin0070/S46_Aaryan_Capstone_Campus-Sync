import React, { useState, useEffect } from "react";
import axios from "axios";
import "./rank.css";

function Rank() {
  const [scoresData, setScoresData] = useState([]);
  const [examName, setExamName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [results, setResults] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_SERVER_URL + "/scores/details")
      .then((response) => {
        setScoresData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching scores:", error);
      });
  }, []);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const filteredResults = scoresData
      .map((student) => {
        const detail = student.details.find(
          (detail) => detail.exam === examName && detail.date === examDate
        );
        if (detail) {
          const totalScore = detail.scores.length * 100;
          const securedScore = detail.scores.reduce(
            (acc, score) => acc + score,
            0
          );
          const percentage = (securedScore / totalScore) * 100;
          return { name: student.name, percentage: percentage.toFixed(2) };
        }
        return null;
      })
      .filter((result) => result !== null);

    // Sort the results in descending order of percentage
    filteredResults.sort((a, b) => b.percentage - a.percentage);

    setResults(filteredResults);
    setCurrentIndex(0); // Reset to the first page of results
  };

  // Handle scrolling to the left
  const handleScrollLeft = () => {
    if (currentIndex > 0) { 
      setCurrentIndex(currentIndex - 3);
    }
  };

  // Handle scrolling to the right
  const handleScrollRight = () => {
    if (currentIndex + 3 < results.length) { 
      setCurrentIndex(currentIndex + 3);
    }
  };

  return (
    <div className="rank-scores-container">
      <div className="rank-title">Exam Scores Leaderboard</div>
      <form onSubmit={handleSubmit} className="rank-form">
        <div className="rank-form-inputs">
          <label htmlFor="examName">Exam Name:</label>
          <input
            type="text"
            id="examName"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            required
          />
        </div>
        <div className="rank-form-inputs">
          <label htmlFor="examDate">Exam Date:</label>
          <input
            type="text"
            id="examDate"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" id="rank-form-button">
          Get Ranks
        </button>
      </form>
      <div id="rank-reminder">(Please provide the exam name and exam date as per the score cards under the Results section)</div>
      <div id="rank-results">
        <div id="rank-results-title">Results</div>
        {results.length > 0 ? (
          <div className="rank-leaderboard-container">
            <button
              className="scroll-button left"
              onClick={handleScrollLeft}
              disabled={currentIndex === 0}
            >
              &lt;
            </button>
            <div className="rank-leaderboard">
              {results.slice(currentIndex, currentIndex + 3).map((result, index) => (
                <div key={index} className="rank-student-card">
                  <div className="rank-rank">Rank: {currentIndex + index + 1}</div>
                  <p className="rank-detail">Name:&nbsp;<span>{result.name.substring(0, 16)}</span></p>
                  <p className="rank-detail">Percentage:&nbsp;<span>{result.percentage}%</span></p>
                </div>
              ))}
            </div>
            <button
              className="scroll-button right"
              onClick={handleScrollRight}
              disabled={currentIndex + 3 >= results.length}
            >
              &gt;
            </button>
          </div>
        ) : (
          <p className="rank-no-results">
            No results found for the given exam name and date.
          </p>
        )}
      </div>
    </div>
  );
}
export default Rank;
