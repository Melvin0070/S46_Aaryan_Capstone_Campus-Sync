import axios from "axios";

const handlePayment = async (feeId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/fees/details/${feeId}`
    );
    console.log("Fee Details:", response.data);
  
    const orderUrl = `${import.meta.env.VITE_SERVER_URL}/razorpay/create-order`;
    const orderData = {
      feeId,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const orderResponse = await axios.post(orderUrl, orderData);
    console.log("Order Response:", orderResponse.data);

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
        const verifyUrl = `${import.meta.env.VITE_SERVER_URL}/razorpay/verify-payment`;

        try {
          const verificationData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            feeId: orderResponse.data.feeId,
          };

          const result = await axios.post(verifyUrl, verificationData);
          console.log("Verification Result:", result.data);
          alert(`Payment ${result.data.status}`);
        } catch (error) {
          console.error("Error verifying payment:", error);
        }
      },
      theme: {
        color: "#0000c4",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  } catch (error) {
    console.error("Error handling payment:", error);
  }
};

export default handlePayment;
