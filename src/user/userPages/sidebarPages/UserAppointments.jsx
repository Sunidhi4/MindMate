import axios from "axios";
import { useEffect, useState } from "react";

const UserAppointments = () => {
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const getUserAppointments = async () => {
      setLoading(true);
      try {
        const userId = sessionStorage.getItem("id");
        const res = await axios.get(
          `http://localhost:8080/appointment/getAppointmentsByUserId/${userId}`
        );
        if (res.data) setAppointments(res.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserAppointments();
  }, []);

  const parseBackendDate = (str) => {
    if (!str) return new Date(0);
    const [datePart, timePart] = str.split(" ");
    const [year, month, day] = datePart.split("-").map(Number);
    const [hour, minute, second] = timePart.split(":").map(Number);
    return new Date(year, month - 1, day, hour, minute, second);
  };

  return (
    <div className="-m-10 p-20 bg-gradient-to-b from-[#d4d2f2] via-[#fff] to-[#fff] h-full ">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-12 tracking-wide">
        Your Appointments
      </h1>

      {loading ? (
        <div className="flex justify-center items-center text-gray-600 text-lg">
          Loading your appointments...
        </div>
      ) : appointments.length > 0 ? (
        <div className="flex flex-col gap-10">
          {appointments.map((appointment, index) => {
            const scheduled = appointment.isScheduled === "true";

            return (
              <div
                key={index}
                className={`border-black  border-2 relative rounded-3xl p-6 flex flex-col justify-between gap-4 transition-shadow duration-300 ${
                  scheduled
                    ? "bg-gradient-to-br bg-gradient-to-br from-[#88caeb] to-[#d393fb] text-white shadow-xl hover:shadow-2xl"
                    : "bg-gray-200 text-gray-700 opacity-70 pointer-events-none shadow-md"
                }`}
              >
                {/* Status Badge */}
                <span
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
                    scheduled
                      ? "bg-teal-300 text-gray-900"
                      : "bg-gray-400 text-white"
                  }`}
                >
                  {scheduled ? "Scheduled" : "Held"}
                </span>

                {/* Expert Info */}
                <div className="flex flex-col gap-2 text-black">
                  <h2 className="text-2xl font-bold tracking-wide">
                    {appointment.expertName}
                  </h2>
                  <p className="text-sm font-medium">
                    <span className="font-semibold">Experience:</span>{" "}
                    {appointment.expertExperience}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">About:</span> {appointment.expertAbout}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Address:</span> {appointment.expertAddress}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Rating:</span>{" "}
                    {appointment.expertRating || "N/A"}
                  </p>
                </div>

                {/* Appointment Details */}
                <div
                  className={`mt-4 p-4 rounded-xl shadow-inner ${
                    scheduled ? "bg-gray-200 text-gray-800" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <p className="mb-2">
                    <span className="font-semibold">Reason:</span> {appointment.reason}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Date & Time:</span>{" "}
                    {parseBackendDate(appointment.time).toLocaleString()}
                  </p>
                  <p className="mb-0">
                    <span className="font-semibold">Fees:</span> ₹{appointment.fees} Paid
                  </p>
                </div>

               
                
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-gray-500 text-center text-lg mt-10">
          No appointments found.
        </div>
      )}
    </div>
  );
};

export default UserAppointments;
