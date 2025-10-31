import axios from "axios";
import { useEffect, useState } from "react";

const Appointments = () => {
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const getUserAppointments = async () => {
      setLoading(true);
      try {
        const expertId = sessionStorage.getItem("id");
        const res = await axios.get(
          `http://localhost:8080/appointment/getAppointmentByExpertId/${expertId}`
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
    <div className="-mt-10 p-10 pt-20  ">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-12 tracking-wide">
        Your Bookings
      </h1>

      {loading ? (
        <div className="flex justify-center items-center text-gray-600 text-lg">
          Loading your appointments...
        </div>
      ) : appointments.length > 0 ? (
        <div className="grid grid-cols-2">
          {appointments.map((appointment, index) => {
            const scheduled = appointment.isScheduled === "true";

            return (
              <div
                key={index}
                className={`border-black w-120 border-2 relative rounded-3xl p-6 flex flex-col  justify-between gap-4 transition-shadow duration-300 ${scheduled
                  ? "bg-linear-to-br from-[#88caeb] to-[#d393fb] text-white shadow-xl hover:shadow-2xl"
                  : "bg-gray-200 text-gray-700 opacity-70 pointer-events-none shadow-md"
                  }`}
              >
                {/* Status Badge */}
                <span
                  className={` absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${scheduled
                    ? "bg-teal-300 text-gray-900"
                    : "bg-gray-400 text-white"
                    }`}
                >
                  {scheduled ? "Scheduled" : "Held"}
                </span>

                {/* Appointment Details */}
                <div
                  className={`mt-4 p-4 rounded-xl shadow-inner ${scheduled ? " text-black" : "bg-gray-100 text-gray-700"
                    }`}
                >
                  <p className="mb-2 mt-3">
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
  )
}
export default Appointments



