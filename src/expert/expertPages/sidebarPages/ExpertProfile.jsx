import axios from "axios";
import React, { useEffect, useState } from "react";

const ExpertProfile = () => {
  const [expertData, setExpertData] = useState({
    email: "",
    fullName: "",
    about: "",
    gender: "",
    age: "",
    joiningDate: "",
    qualification: [],
    experience: "",
    fees: "",
    address: "",
    rating: "",
  });

  // ✅ Format joining date nicely
  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const getExpertData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/Expert/getExpertByExpertId/${sessionStorage.getItem("id")}`
        );
        if (res.data) {
          console.log(res.data);
          setExpertData((prev) => ({ ...prev, ...res.data }));
        }
      } catch (e) {
        console.log(e);
      }
    };
    getExpertData();
  }, []);

  return (
    <div className=" mx-auto bg-white shadow-xl rounded-2xl p-12  border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-5 pb-6 border-b border-gray-200">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#39b1e8] to-[#8f2fb8] flex items-center justify-center text-white text-3xl font-bold">
          {expertData.fullName?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-[#952ab3] capitalize">
            {expertData.fullName}
          </h2>
          <p className="text-[#112864] text-sm">{expertData.email}</p>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-6 space-y-4 text-gray-700">
        <InfoRow label="Gender" value={expertData.gender} />
        <InfoRow label="Age" value={expertData.age} />
        
        <div>
          <div className="flex justify-between py-2">
            <span className="font-medium text-[#0C4663]">About:</span>
            <div className="flex flex-wrap justify-center w-4xl align-middle">
              <span className="text-gray-600 text-right text-justify ">{expertData.about}</span>
            </div>
          </div>
          <hr className="text-gray-200" />
        </div>
        <InfoRow label="Experience" value={expertData.experience} />

        {/* Qualifications */}
        <div className="flex justify-between py-2">
          <span className="font-medium text-[#0C4663]">Qualifications:</span>
          <span className="text-right">
            {expertData.qualification.map((qualification, index) => (
              <span key={index} className="ml-1 text-gray-600 whitespace-pre-line">
                {qualification}
                {index < expertData.qualification.length - 1 && "\n"}
              </span>
            ))}
          </span>
        </div>
        <hr className="text-gray-200" />

        <InfoRow label="Fees" value={`₹${expertData.fees}`} />
        <InfoRow label="Joined on" value={formatDate(expertData.joiningDate)} />
        <InfoRow label="Address" value={expertData.address} />
        <InfoRow label="Rating" value={`${expertData.rating} ⭐`} />
      </div>
    </div>
  );
};

// Reusable info row component
const InfoRow = ({ label, value }) => (
  <div>
    <div className="flex justify-between py-2">
      <span className="font-medium text-[#0C4663]">{label}:</span>
      <span className="text-gray-600 text-right">{value || "—"}</span>
    </div>
    <hr className="text-gray-200" />
  </div>
);

export default ExpertProfile;
