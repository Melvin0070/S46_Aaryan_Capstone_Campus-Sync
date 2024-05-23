import React, { useEffect, useState } from "react";
import "./fee.css";
import axios from "axios";

function Fee() {
  const [feeDetails, setFeeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_SERVER_URL + "/fees/details/ADMN2004")
      .then((response) => {
        setFeeDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div id="fee-box">
        <div>Details</div>
      </div>
    </div>
  );
}

export default Fee;
