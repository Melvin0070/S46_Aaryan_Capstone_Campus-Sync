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
import {jwtDecode} from "jwt-decode"; 

function Fee() {
  const [feeDetails, setFeeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = getCookie("token"); // Retrieve JWT token from cookies

  // Function to decode JWT token and extract user ID
  const getUserIdFromToken = () => {
    try {
      if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.ID;
      } else {
        console.error("Token not found in cookies");
        return null;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchFeeDetails(); // Fetch fee details when the component mounts or token changes
  }, [token]);

  const fetchFeeDetails = async () => {
    const userID = getUserIdFromToken(); // Get user ID from decoded token
    if (!userID) {
      console.error("User ID not found in token");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/fees/details/${userID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
      setFeeDetails(response.data);
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error("Error fetching fee details:", error);
      setLoading(false); // Set loading to false even if there's an error
    }
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
