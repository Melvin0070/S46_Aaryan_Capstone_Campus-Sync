import axios from "axios";
import { getCookie } from "./cookies";

const handlePayment = async (feeId, callback) => {
  const token = getCookie("accessToken"); // Retrieve token from cookies

  try {
    // Step 1: Fetch fee details using feeId
    const feeDetailsUrl = `${
      import.meta.env.VITE_SERVER_URL
    }/fees/details/${feeId}`;
    const response = await axios.get(feeDetailsUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Step 2: Create Razorpay order
    const orderUrl = `${import.meta.env.VITE_SERVER_URL}/razorpay/create-order`;
    const orderData = {
      feeId,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    const orderResponse = await axios.post(orderUrl, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Step 3: Configure Razorpay options and open payment handler
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: orderResponse.data.amount,
      currency: orderResponse.data.currency,
      name: "Campus Sync",
      description: "Fee Payment",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS763FgzYKazSLvR4nRgWxhwEOYIQuqf0adJlVMBhwc9sGBmO5LpbLPB2c6GZbvMimFpzc&usqp=CAU",
      order_id: orderResponse.data.id,
      handler: async (response) => {
        console.log("Payment Handler Response:", response);
        try {
          // Step 4: Verify payment using Razorpay response
          const verificationData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            feeId,
            amount: orderResponse.data.amount,
            currency: orderResponse.data.currency,
          };

          const verifyPaymentUrl = `${
            import.meta.env.VITE_SERVER_URL
          }/razorpay/verify-payment`;
          const result = await axios.post(verifyPaymentUrl, verificationData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("Verification Result:", result.data);
          alert(`Payment ${result.data.status}`);

          // Step 5: Call the callback function with true if payment was successful
          if (
            result.data.status === "success" &&
            typeof callback === "function"
          ) {
            callback(true);
          }
        } catch (error) {
          console.error("Error verifying payment:", error);

          // Step 6: Call the callback function with false if payment verification fails
          if (typeof callback === "function") {
            callback(false);
          }
        }
      },
      theme: {
        color: "#0000c4",
      },
    };

    // Step 7: Initialize and open Razorpay payment dialog
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  } catch (error) {
    console.error("Error handling payment:", error);
  }
};

export default handlePayment;
