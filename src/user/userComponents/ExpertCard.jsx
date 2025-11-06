import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export const ExpertCard = ({ expert }) => {
  const { id, fullName, about, address, experience, fees, gender, rating } = expert;

  const profileImage =
    gender === "male"
      ? "https://i.pravatar.cc/100?img=12"
      : "https://i.pravatar.cc/100?img=47";

  return (
    <Link
      to={`/user/expertDetails`}
      state={{ expert }} // Pass full data safely through React Router
      className="block bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 border border-[#c559f7] p-5"
    >
      <div className="flex items-center gap-4">
        {/* Profile Image */}
        <img
          src={profileImage}
          alt={fullName}
          className="w-16 h-16 rounded-full object-cover border-2 border-[#9100BD]"
        />

        {/* Basic Info */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-[#9100BD] capitalize">
            {fullName}
          </h3>
          <p className="text-sm text-gray-600">{about}</p>
          <div className="flex items-center gap-1 mt-1 text-sm text-yellow-500">
            <Star className="w-4 h-4 fill-yellow-400" />
            <span>{rating.toFixed(1)} / 5</span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-4 flex justify-between items-center text-sm">
        <p className="text-gray-600">
          <span className="font-medium text-gray-800">{experience}</span>
        </p>
        <p className="text-[#3C9BF9] font-semibold">₹{fees} / session</p>
      </div>

      <p className="text-xs text-gray-400 mt-1">📍 {address}</p>
    </Link>
  );
};
