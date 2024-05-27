import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './rank.css';

function Rank() {
  const [scoresData, setScoresData] = useState([]);
  const [examName, setExamName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [results, setResults] = useState([]);

  
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
  };

  return (
    <div className="rank-scores-container">
      <h1 className="rank-title">Exam Scores Leaderboard</h1>
      <form onSubmit={handleSubmit} className="rank-form">
        <div className="rank-form-group">
          <label htmlFor="examName" className="rank-label">Exam Name:</label>
          <input
            type="text"
            id="examName"
            className="rank-input"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            required
          />
        </div>
        <div className="rank-form-group">
          <label htmlFor="examDate" className="rank-label">Exam Date:</label>
          <input
            type="text"
            id="examDate"
            className="rank-input"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="rank-button">Get Scores</button>
      </form>
      <div className="rank-results">
        <h2 className="rank-results-title">Results</h2>
        {results.length > 0 ? (
          <div className="rank-leaderboard">
            {results.map((result, index) => (
              <div key={index} className="rank-student-card">
                <div className="rank-rank">Rank: {index + 1}</div>
                <div className="rank-name">{result.name}</div>
                <div className="rank-percentage">{result.percentage}%</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="rank-no-results">No results found for the given exam name and date.</p>
        )}
      </div>
    </div>
  );
}

export default Rank;
