import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft, FaStar } from "react-icons/fa";

import axios from "axios";

const ExpertDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const expertReferece = location.state?.expert;
  const [expert, setExpert] = useState({});
  const [appointment, setAppointment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  //getting expert by expert reference (reference either full object or id)
  useEffect(() => {
    const getExpertObject = async (expertId) => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:8080/public/getExpert/${expertId}`);
        if (res.data) {
          console.log(res.data)
          setExpert(res.data.content);
        } else {
          toast.error("expert Not found");
          navigate(-1);
        }
      }
      catch (error) {
        console.log(error);
      }
      finally {
        setLoading(false);
      }
    }

    if (!isNaN(expertReferece)) {
      getExpertObject(expertReferece);
    } else if (typeof expertReferece === "object") {

      setExpert(expertReferece);
    }


  }, [])



  if (!expert) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        <p>No expert data found. Please go back and try again.</p>
      </div>
    );
  }

  // Get user info from sessionStorage
  const user = {
    name: sessionStorage.getItem("name"),
    age: sessionStorage.getItem("age"),
    email: sessionStorage.getItem("email"),
    gender: sessionStorage.getItem("gender"),
    phone: sessionStorage.getItem("phone"),
    id: sessionStorage.getItem("id"),
  };


  const profileImage =
    expert.gender === "male"
      ? "https://i.pravatar.cc/120?img=12"
      : "https://i.pravatar.cc/120?img=47";

  const formattedDate = new Date(expert.joiningDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();

    // Step 1: Basic validation
    if (!reason || !scheduleTime) {
      alert("Please fill in both fields before submitting.");
      return;
    }

    setLoading(true);

    try {
      // Step 2: Create order on backend
      const amountInPaise = expert.fees * 100; // Razorpay works in paise, not rupees
      const orderRes = await axios.post("http://localhost:8080/api/payment/createOrder", {
        amount: amountInPaise,
      });

      const orderData = orderRes.data;
      console.log("Order created:", orderData);

      // Step 3: Open Razorpay checkout popup
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Expert Consultation",
        description: `Consultation with ${expert.fullName}`,
        order_id: orderData.orderId,
        handler: async function (response) {
          // Step 4: Verify payment
          const verifyRes = await axios.post("http://localhost:8080/api/payment/verify", response);
          if (verifyRes.data.status === "success") {
            // Step 5: Create appointment if payment verified
            const formattedTime = new Date(scheduleTime).toISOString();
            const payload = {
              user: { id: user.id },
              expert: { id: expert.id },
              reason: reason,
            };
            const appointRes = await axios.post(
              `http://localhost:8080/appointment/createAppointment?scheduleTime=${formattedTime}`,
              payload
            );

            if (appointRes.data.status === "success") {
              alert("Appointment booked successfully!");
              setAppointment(false);
              navigate("/user/appointments");
            } else {
              toast.error(appointRes.data.errorMsg);
            }
          } else {
            toast.error("Payment verification failed!");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone,
        },
        theme: { color: "#9100BD" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Something went wrong with payment");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="w-full flex flex-col">
      <div className="w-full bg-white shadow-lg rounded-2xl border border-[#d7e3fc] p-6 relative">
        {!appointment ? (
          <>
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="absolute top-4 left-4 flex items-center text-sm text-[#9100BD] hover:text-[#3C9BF9] transition"
            >
              <FaArrowLeft className="w-4 h-4 mr-1" /> Back
            </button>

            {/* Expert Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mt-6">
              <img
                src={profileImage}
                alt={expert.fullName}
                className="w-28 h-28 rounded-full border-2 border-[#9100BD] object-cover shadow-md"
              />
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-semibold text-[#9100BD] capitalize">
                  {expert.fullName}
                </h1>
                <p className="text-gray-600 mt-1">{expert.about}</p>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-yellow-500">
                  <FaStar className="w-5 h-5 fill-yellow-400" />
                  <span className="font-medium text-gray-700">
                    {expert.rating} / 5
                  </span>
                </div>
              </div>
            </div>

            <hr className="my-6 border-[#e0e7ff]" />

            {/* Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">Email:</span>{" "}
                {expert.email}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Gender:</span>{" "}
                {expert.gender}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Age:</span> {expert.age}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Address:</span>{" "}
                {expert.address}
              </p>
              <p>
                <span className="font-semibold text-gray-900">
                  Experience:
                </span>{" "}
                {expert.experience}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Joined On:</span>{" "}
                {formattedDate}
              </p>
            </div>

            {/* Qualifications */}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Qualifications:
              </h3>
              <ul className="list-disc list-inside text-gray-700">
                
                {expert.qualification && expert.qualification.length > 0 ? (
                  expert.qualification.map((q, index) => (
                    <li key={index} className="text-sm">
                      {q}
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">No qualifications listed.</p>
                )}
              </ul>
            </div>

            {/* Fees & Book */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-lg font-semibold text-[#3C9BF9]">
                Consultation Fee: ₹{expert.fees}
              </p>
              <button
                onClick={() => setAppointment(true)}
                className="px-6 py-2 bg-linear-to-r from-[#3C9BF9] to-[#9100BD] text-white rounded-md font-semibold shadow-md hover:opacity-90 transition"
              >
                Book a Session
              </button>
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default ExpertDetails;
