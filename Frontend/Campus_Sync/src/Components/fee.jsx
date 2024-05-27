import React, { useEffect, useState } from "react";
import "./fee.css";
import axios from "axios";

function Fee() {
  const [feeDetails, setFeeDetails] = useState(null);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_SERVER_URL + "/fees/details/ADMN2004")
      .then((response) => {
        setFeeDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!feeDetails) {
    return <div className="loading-div">Loading...</div>;
  }

  return (
    <div>
      <div id="fee-box">
        <div id="fee-heading">Fee Payment Details</div>
        <div id="fee-details">
          <p>
            Name: <span>{feeDetails.name}</span>
          </p>
          <p>
            Student ID: <span>{feeDetails.ID}</span>
          </p>
          <p>
            Amount Due: <span>Rs. {feeDetails.amount}</span>{" "}
          </p>
          <p>
            Fee Breakdown: <span id="fee-breakdown">{feeDetails.details}</span>
          </p>
          <p>
            Payment Status: <span>{feeDetails.status}</span>
          </p>
        </div>
        <div id="payment-div">
          <div className="payment-button">Pay Now</div>
        </div>
      </div>
    </div>
  );
}

export default Fee;
