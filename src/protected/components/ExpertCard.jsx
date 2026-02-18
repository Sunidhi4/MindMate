import { Link } from "react-router-dom";
import { Star, MapPin, BadgeCheck } from "lucide-react";

export const ExpertCard = ({ expert }) => {
  const {
    id,
    fullName,
    about,
    address,
    experience,
    fees,
    gender,
    rating,
    qualifications,
    verified,
  } = expert;

  const profileImage =
    gender?.toLowerCase() === "male"
      ? "https://i.pravatar.cc/150?img=12"
      : "https://i.pravatar.cc/150?img=47";

  return (
    <Link
      to={`/user/expertDetails`}
      state={{ expert }}
      className="group block bg-white rounded-3xl border border-purple-300 hover:border-pink-300 
                 shadow-sm hover:shadow-xl hover:-translate-y-1 
                 transition-all duration-300 p-6"
    >
      {/* Top Section */}
      <div className="flex items-start gap-5">

        {/* Profile Image */}
        <div className="relative">
          <div
            
            className="w-20 h-20 rounded-full object-cover 
                       border-2 border-purple-600 shadow-md flex justify-center items-center font-extrabold text-4xl bg-blue-100 text-[#9100BD]"
          >{fullName.charAt(0)}</div>

          {verified && (
            <BadgeCheck
              className="absolute -bottom-1 -right-1 
                         w-6 h-6 text-[#3C9BF9] bg-white rounded-full"
            />
          )}
        </div>

        {/* Info */}
        <div className="flex-1">

          <h3 className="text-lg font-bold text-[#9100BD] flex items-center gap-2">
            {fullName}
          </h3>

          {/* Qualifications */}
          <div className="flex flex-wrap gap-2 mt-1">
            {qualifications?.map((q, index) => (
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
            {about}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2 text-sm text-yellow-500">
            <Star className="w-4 h-4 fill-yellow-400" />
            <span className="text-gray-700 font-medium">
              {rating ? rating : "0"} / 5
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-gray-100"></div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center text-sm">

        <div className="flex flex-col gap-1 text-gray-600">
          <span>
            <span className="font-semibold text-gray-800">
              {experience}
            </span>{" "}
            Years Experience
          </span>

          <span className="flex items-center gap-1 text-xs">
            <MapPin className="w-3 h-3 text-[#3C9BF9]" />
            {address}
          </span>
        </div>

        <div className="text-right">
          <p className="text-lg font-bold bg-gradient-to-r from-[#3C9BF9] to-[#9100BD] 
                        bg-clip-text text-transparent">
            ₹{fees}
          </p>
          <p className="text-xs text-gray-500">per session</p>
        </div>
      </div>
    </Link>
  );
};