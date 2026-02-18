import React, { useEffect, useState } from "react";
import { ShieldCheck, Clock, Phone, Mail } from "lucide-react";
import axios from "axios";
import { Navigate } from "react-router-dom";



const VerificationSubmitted = () => {
  const [loading , setLoading] = useState(false);
  useEffect(()=>{
    async function getMyProfile() {
      try{
        setLoading(true);
        const res = await axios.get(`http://localhost:8080/expert/myProfile` , {
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        if(res.data){
          if(res.data.verified){
            <Navigate to="/expert/dashboard" replace/>
          }
        }
    }catch(e){
      console.log(e);
    }
    finally{
      setLoading(false);
    }
    }
    getMyProfile() 

  } , [])
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient px-6">

      <div className="bg-white max-w-2xl w-full rounded-3xl shadow-2xl p-10 text-center relative overflow-hidden">

        {/* Decorative Blur Circle */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-40"></div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-linear-to-r from-[#3C9BF9] to-[#9100BD] p-5 rounded-full shadow-lg">
            <ShieldCheck className="text-white w-10 h-10" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Verification Submitted Successfully
        </h1>

        <p className="text-gray-600 text-lg mb-6">
          Thank you for completing your verification process.  
          Our admin team is currently reviewing your details carefully.
        </p>

        {/* Info Section */}
        <div className="bg-purple-50 rounded-2xl p-6 text-left space-y-4">

          <div className="flex items-start gap-3">
            <Clock className="text-[#9100BD] mt-1" />
            <p className="text-gray-700">
              Review usually takes <span className="font-semibold">4-8 Days</span>.
              We ensure every profile meets our quality standards.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="text-[#3C9BF9] mt-1" />
            <p className="text-gray-700">
              You may receive a call from our admin team for a short discussion
              or additional clarification.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="text-[#9100BD] mt-1" />
            <p className="text-gray-700">
              Once approved, you will receive a confirmation notification
              and full access to platform features.
            </p>
          </div>

        </div>

        {/* Notice */}
        <div className="mt-6 text-sm text-gray-500">
          ⚠️ Until verification is complete, you won’t be able to access
          booking, dashboard tools, or client interactions.
        </div>

        {/* Footer Message */}
        <div className="mt-8">
          <p className="text-gray-700 font-medium">
            We appreciate your patience and cooperation.
          </p>
          <p className="text-transparent bg-clip-text bg-linear-to-r from-[#3C9BF9] to-[#9100BD] font-semibold mt-2">
            We're excited to have you onboard soon!
          </p>
           <p className="text-gray-500 text-xs pt-2">
            For more details call on : +91 7223959729
          </p>
        </div>

      </div>
    </div>
  );
};

export default VerificationSubmitted;