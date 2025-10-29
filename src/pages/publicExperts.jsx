import axios from "axios";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";


const publicExperts = () => {
    const navigate = useNavigate();
    const [experts, setExperts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getAllExperts() {
            try {
                const res = await axios.get("http://localhost:8080/Expert/getAllExperts");
                setExperts(res.data);
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
        <div className=" px-40 py-20 grid grid-cols-3 gap-10 bg-gradient ">

            {experts != null && experts.length > 0 ?
                experts.map((expert, index) => (
                    <button 
                    key={expert.id} 
                    className="p-5 flex flex-col gap-2 items-start bg-linear-to-br from-[#c4e3f3] to-[#e3caf4] border-2 border-black rounded-2xl shadow-gray-400 shadow-xs hover:shadow-2xl transition transform hover:-translate-y-1 "
                    onClick={()=>navigate("/login")}
                    >
                        <div className="flex items-center  gap-4">
                            {/* Profile Image */}

                            <div className=" w-12 h-12 rounded-full  flex items-center justify-center   font-bold text-2xl text-white bg-[#075d92]">
                                {expert.fullName.charAt(0).toUpperCase()}
                            </div>

                            {/* Basic Info */}

                            <h3 className="text-lg font-semibold text-[#9100BD] capitalize">
                                {expert.fullName}
                            </h3>

                        </div>
                        <p className="mt-2 text-sm text-gray-700 ">{expert.about.substring(0 , 200)} <span className="text-gray-500 text-xs hover:text-blue-400 " title="login to see more">{expert.about.length > 200 ? "...see more" : ""}</span></p>

                        {/* Bottom Section */}

                        <p className="text-gray-600">
                            <span className="font-medium text-gray-800">{expert.experience}</span>
                        </p>
                        <p className="text-[#3C9BF9] font-semibold">₹{expert.fees} / session</p>


                        <p className="text-xs text-gray-600 mt-1">📍 {expert.address}</p>
                        <div className=" flex items-center gap-1 mt-1 text-sm text-yellow-600">
                            <Star className="w-4 h-4 fill-yellow-600" />
                            <span>{expert.rating.toFixed(1)} / 5</span>
                        </div>

                    </button>
                ))
                : (<p className="text-gray-500 text-center">No Expert found.</p>)}


        </div>
    )
}
export default publicExperts;
