import React from 'react'

const BookAppointment = () => {
      const [reason, setReason] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
    const [appointment, setAppointment] = useState(false);
  return (
    <div>
        {/* Back Button */}
            <button
              onClick={() => setAppointment(false)}
              className="absolute top-4 left-4 flex items-center text-sm text-[#9100BD] hover:text-[#3C9BF9] transition"
            >
              <FaArrowLeft className="w-4 h-4 mr-1" /> Back
            </button>

            {/* Appointment Form */}
            <div className="pt-8 flex flex-col gap-6">
              <h2 className="text-purple-700 font-bold text-2xl">
                Book Appointment
              </h2>

              {/* User Details */}
              <div className="bg-[#f8f9ff] p-4 rounded-xl border border-[#d7e3fc]">
                <h3 className="text-lg font-semibold text-[#9100BD] mb-2">
                  Your Details
                </h3>
                <p><b>Name:</b> {user.name}</p>
                <p><b>Age:</b> {user.age}</p>
                <p><b>Email:</b> {user.email}</p>
                <p><b>Phone:</b> {user.phone}</p>
              </div>

              {/* Expert Details */}
              <div className="bg-[#f8f9ff] p-4 rounded-xl border border-[#d7e3fc]">
                <h3 className="text-lg font-semibold text-[#3C9BF9] mb-2">
                  Expert Details
                </h3>
                <p><b>Name:</b> {expert.fullName}</p>
                <p><b>About:</b> {expert.about}</p>
                <p><b>Address:</b> {expert.address}</p>
              </div>

              {/* Appointment Form */}
              <form
                onSubmit={handleAppointmentSubmit}
                className="flex flex-col gap-5 mt-4"
              >
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Reason for Appointment
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Write your reason for consultation..."
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#9100BD] outline-none"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Select Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#3C9BF9] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 px-6 py-3 bg-linear-to-r from-[#3C9BF9] to-[#9100BD] text-white rounded-lg font-semibold shadow-md hover:opacity-90 transition"
                >
                  pay ₹{expert.fees}/-
                </button>
              </form>
            </div>
    </div>
  )
}

export default BookAppointment

// const handleAppointmentSubmit = async (e) => {
//     e.preventDefault();

//     // Step 1: Basic validation
//     if (!reason || !scheduleTime) {
//       alert("Please fill in both fields before submitting.");
//       return;
//     }

//     setLoading(true);

//     try {
//       // Step 2: Create order on backend
//       const amountInPaise = expert.fees * 100; // Razorpay works in paise, not rupees
//       const orderRes = await axios.post("http://localhost:8080/api/payment/createOrder", {
//         amount: amountInPaise,
//       });

//       const orderData = orderRes.data;
//       console.log("Order created:", orderData);

//       // Step 3: Open Razorpay checkout popup
//       const options = {
//         key: orderData.key,
//         amount: orderData.amount,
//         currency: orderData.currency,
//         name: "Expert Consultation",
//         description: `Consultation with ${expert.fullName}`,
//         order_id: orderData.orderId,
//         handler: async function (response) {
//           // Step 4: Verify payment
//           const verifyRes = await axios.post("http://localhost:8080/api/payment/verify", response);
//           if (verifyRes.data.status === "success") {
//             // Step 5: Create appointment if payment verified
//             const formattedTime = new Date(scheduleTime).toISOString();
//             const payload = {
//               user: { id: user.id },
//               expert: { id: expert.id },
//               reason: reason,
//             };
//             const appointRes = await axios.post(
//               `http://localhost:8080/appointment/createAppointment?scheduleTime=${formattedTime}`,
//               payload
//             );

//             if (appointRes.data.status === "success") {
//               alert("Appointment booked successfully!");
//               setAppointment(false);
//               navigate("/user/appointments");
//             } else {
//               toast.error(appointRes.data.errorMsg);
//             }
//           } else {
//             toast.error("Payment verification failed!");
//           }
//         },
//         prefill: {
//           name: user.name,
//           email: user.email,
//           contact: user.phone,
//         },
//         theme: { color: "#9100BD" },
//       };

//       const razor = new window.Razorpay(options);
//       razor.open();
//     } catch (error) {
//       console.error("Payment error:", error);
//       toast.error("Something went wrong with payment");
//     } finally {
//       setLoading(false);
//     }
//   };


//   // Get user info from sessionStorage
//   const user = {
//     name: sessionStorage.getItem("name"),
//     age: sessionStorage.getItem("age"),
//     email: sessionStorage.getItem("email"),
//     gender: sessionStorage.getItem("gender"),
//     phone: sessionStorage.getItem("phone"),
//     id: sessionStorage.getItem("id"),
//   };
