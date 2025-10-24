import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";

const ExpertDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const expert = location.state?.expert;

  if (!expert) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        <p>No expert data found. Please go back and try again.</p>
      </div>
    );
  }

  const {
    fullName,
    about,
    address,
    age,
    email,
    gender,
    qualification,
    experience,
    fees,
    rating,
    joiningDate,
  } = expert;

  const profileImage =
    gender === "male"
      ? "https://i.pravatar.cc/120?img=12"
      : "https://i.pravatar.cc/120?img=47";

  const formattedDate = new Date(joiningDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className=" w-full  flex flex-col ">
      {/* Header Section */}
      <div className="w-full  bg-white shadow-lg rounded-2xl border border-[#d7e3fc] p-6 relative">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center text-sm text-[#9100BD] hover:text-[#3C9BF9] transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </button>

        {/* Expert Info Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mt-6">
          <img
            src={profileImage}
            alt={fullName}
            className="w-28 h-28 rounded-full border-2 border-[#9100BD] object-cover shadow-md"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-semibold text-[#9100BD] capitalize">
              {fullName}
            </h1>
            <p className="text-gray-600 mt-1">{about}</p>
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-yellow-500">
              <Star className="w-5 h-5 fill-yellow-400" />
              <span className="font-medium text-gray-700">{rating.toFixed(1)} / 5</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-[#e0e7ff]" />

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <p>
            <span className="font-semibold text-gray-900">Email:</span> {email}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Gender:</span> {gender}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Age:</span> {age}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Address:</span> {address}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Experience:</span>{" "}
            {experience}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Joined On:</span> {formattedDate}
          </p>
        </div>

        {/* Qualification Section */}
        <div className="mt-6">
          <h3 className="font-semibold text-gray-900 mb-2">Qualifications:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {qualification && qualification.length > 0 ? (
              qualification.map((q, index) => (
                <li key={index} className="text-sm">{q}</li>
              ))
            ) : (
              <p className="text-gray-500">No qualifications listed.</p>
            )}
          </ul>
        </div>

        {/* Fees & Action */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-lg font-semibold text-[#3C9BF9]">
            Consultation Fee: ₹{fees}
          </p>
          <button
            onClick={() => alert("Booking feature coming soon!")}
            className="px-6 py-2 bg-gradient-to-r from-[#3C9BF9] to-[#9100BD] text-white rounded-md font-semibold shadow-md hover:opacity-90 transition"
          >
            Book a Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpertDetails;
