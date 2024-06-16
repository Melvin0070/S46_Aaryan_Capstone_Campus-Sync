import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './alumni.css';
import { getCookie } from './cookies.jsx'; 

function Alumni() {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = getCookie('token'); // Retrieve JWT token from cookies

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/alumnis/details`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include JWT token in headers
            },
          }
        );
        setAlumni(response.data);
      } catch (error) {
        console.error('Error fetching alumni data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, [token]); //Get the alumni whenever the token changes

  return (
    <div className="alumni-container">
      <p className="title">Hall of Fame</p>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="alumni-grid">
          {alumni.map((alum) => (
            <div className="alumni-card" key={alum._id}>
              <p className="alumni-name">{alum.name}</p>
              <p className="alumni-passout">Passing year - {alum.passout}</p>
              <p className="alumni-successStory">{alum.successStory}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Alumni;
