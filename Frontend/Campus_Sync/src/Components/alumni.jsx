import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './alumni.css';
import { getCookie } from './cookies.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Alumni() {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = getCookie('accessToken'); // Retrieve JWT token from cookies
  const toastShown = useRef(false); // useRef to track whether the success toast has been shown

  useEffect(() => {
    const fetchAlumni = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/alumnis/details`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include JWT token in headers
            },
          }
        );

        const { message, alumnis } = response.data; // Extract alumni and message from response
        setAlumni(alumnis);

        if (!toastShown.current) {
          toast.success(message);
          toastShown.current = true;
        }
      } catch (error) {
        toast.error('Error fetching alumni data.');
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchAlumni();
  }, [token]); // Run the effect when the token changes

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
