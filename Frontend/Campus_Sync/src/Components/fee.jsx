import React, { useEffect, useState } from "react";
import "./fee.css";
import axios from "axios";
import {
  FaUserGraduate,
  FaIdBadge,
  FaMoneyBillWave,
  FaInfoCircle,
  FaCheckCircle,
} from "react-icons/fa";
import handlePayment from "./razorpay";
import { getCookie } from "./cookies.jsx";

function Fee() {
  const [feeDetails, setFeeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const userID = getCookie("userID"); // Get the userID from cookies

  useEffect(() => {
    fetchFeeDetails(); // Fetch fee details when the component mounts
  }, [userID]);

  const fetchFeeDetails = () => {
    if (!userID) {
      console.error("User ID is not available in cookies");
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .get(import.meta.env.VITE_SERVER_URL + `/fees/details/${userID}`)
      .then((response) => {
        setFeeDetails(response.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Set loading to false even if there's an error
      });
  };

  const formattedAmount = feeDetails?.amount?.toLocaleString() || "";

  const handlePayNow = () => {
    handlePayment(feeDetails.ID, (paymentSuccessful) => {
      if (paymentSuccessful) {
        // If payment was successful, fetch the fee details again
        fetchFeeDetails();
      }
    });
  };

  if (loading) {
    return <div className="loading-div">Loading...</div>;
  }

  return (
    <div>
      <div id="fee-box">
        <div id="fee-heading">Fee Payment Details</div>
        <div id="fee-details">
          <p>
            <FaUserGraduate /> Name: <span>{feeDetails.name}</span>
          </p>
          <p>
            <FaIdBadge /> Student ID: <span>{feeDetails.ID}</span>
          </p>
          <p>
            <FaMoneyBillWave /> Amount Due: <span>Rs. {formattedAmount}</span>
          </p>
          <p id="fee-breakdown-p">
            <FaInfoCircle /> Fee Breakdown:{" "}
            <span id="fee-breakdown">{feeDetails.details}</span>
          </p>
          <p>
            <FaCheckCircle /> Payment Status: <span>{feeDetails.status}</span>
          </p>
        </div>
        <div id="payment-div">
          <p className="test-card-details">
            <a
              href="https://razorpay.com/docs/payments/payments/test-card-details/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Checkout Razorpay Test Card Details
            </a>
          </p>
          <button onClick={handlePayNow} className="payment-button">
            {feeDetails.status === "Paid" ? "Demo Pay" : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Fee;
