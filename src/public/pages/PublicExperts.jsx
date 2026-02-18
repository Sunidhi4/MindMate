import axios from "axios";
import { useEffect, useState } from "react";
import {  BadgeCheck, MapPin, Star } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

const publicExperts = () => {
    const navigate = useNavigate();
    const [experts, setExperts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getAllExperts() {
            try {
                setLoading(true);
                const res = await axios.get("http://localhost:8080/public/getAllExperts");
                setExperts(res.data.content);
            } catch {
                console.log(e);
            }
            finally {
                setLoading(false);
            }
        }
        getAllExperts();
    }, [])
    return (
        <div className="min-h-screen bg-blue-100">
            <div className="flex flex-wrap justify-center gap-20 py-10 ">
                {experts != null && experts.length > 0 ?
                        experts.map((expert) => (
                            <div key={expert.id}
                           
                            className="w-md h-[380px] bg-gradient border-2 border-violet-600 rounded-2xl flex flex-col p-8
                            hover:scale-105 transition-transform duration-300 hover:border-pink-600">
                                {/* Profile Image */}
        <div className="relative">
          <div
            
            className="w-20 h-20 rounded-full object-cover 
                       border-4 border-white shadow-md flex justify-center items-center text-4xl font-extrabold text-purple-700 bg-blue-400"
          > {expert.fullName.charAt(0)}</div>

          {expert.verified && (
            <BadgeCheck
              className="absolute -bottom-1 -right-1 
                         w-6 h-6 text-[#3C9BF9] bg-white rounded-full"
            />
          )}
        </div>

        {/* Info */}
        <div className="flex-1">

          <h3 className="text-lg font-bold text-[#9100BD] flex items-center gap-2">
            {expert.fullName}
          </h3>

          {/* Qualifications */}
          <div className="flex flex-wrap gap-2 mt-1">
            {expert.qualifications?.map((q, index) => (
              <span
                key={index}
                className="text-xs bg-purple-50 text-[#9100BD] px-2 py-1 rounded-full"
              >
                {q}
              </span>
            ))}
          </div>

          {/* About */}
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {expert.about}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2 text-sm text-yellow-500">
            <Star className="w-4 h-4 fill-yellow-400" />
            <span className="text-gray-700 font-medium">
              {expert.rating ? rating : "0"} / 5
            </span>
          </div>
        </div>
          {/* Bottom Section */}
      <div className="flex justify-between items-center text-sm">

        <div className="flex flex-col gap-1 text-gray-600">
          <span>
            <span className="font-semibold text-gray-800">
              {expert.experience}
            </span>{" "}
            Years Experience
          </span>

          <span className="flex items-center gap-1 text-xs">
            <MapPin className="w-3 h-3 text-[#3C9BF9]" />
            {expert.address}
          </span>
        </div>

        <div className="text-right">
          <p className="text-lg font-bold bg-gradient-to-r from-[#3C9BF9] to-[#9100BD] 
                        bg-clip-text text-transparent">
            ₹{expert.fees}
          </p>
          <p className="text-xs text-gray-500">per session</p>
        </div>
      </div>

    
                            </div>
                        ))
                
                : (<p>No Expert found</p>)}
            </div>
        </div>
    )
}
export default publicExperts;
