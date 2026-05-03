import React from "react";
import axios from "axios";

const PaymentPage = () => {
  const handlePayment = async () => {
    try {
      // Step 1: Create order on backend
      const orderUrl = "https://mindmate-production-81d8.up.railway.app/api/payment/createOrder";
      const { data } = await axios.post(orderUrl, { amount: 50000 }); // ₹500.00

      // Step 2: Open Razorpay checkout
      const options = {
        key: data.key, // Your Razorpay keyId
        amount: data.amount.toString(),
        currency: data.currency,
        name: "My Company Pvt Ltd",
        description: "Test Transaction",
        order_id: data.orderId,
        handler: async function (response) {
          // Step 3: Verify payment on backend
          const verifyUrl = "https://mindmate-production-81d8.up.railway.app/api/payment/verify";
          const res = await axios.post(verifyUrl, response);
          alert(res.data.status);
        },
        theme: { color: "#3399cc" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Error in payment", error);
    }
  };

  return (
    <div className="payment-container" style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Pay ₹500</h2>
      <button
        onClick={handlePayment}
        style={{
          backgroundColor: "#528FF0",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;