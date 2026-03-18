import { Link } from "react-router-dom";
import { Star, MapPin, BadgeCheck, Clock } from "lucide-react";

export const ExpertCard = ({ expert }) => {
  const { id, fullName, about, address, experience, fees, gender, rating, qualifications, verified } = expert;

  const isMale = gender?.toUpperCase() === "MALE";
  const genderLabel = isMale ? "Male" : "Female";
  const genderIcon = isMale ? "♂" : "♀";
  const genderStyle = isMale
    ? { background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe" }
    : { background: "#fdf2f8", color: "#9d174d", border: "1px solid #fbcfe8" };

  return (
    <Link
      to="/user/expertDetails"
      state={{ expertId: id }}
      className="group relative block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden
                 border border-purple-100 dark:border-gray-700
                 shadow-sm hover:shadow-lg hover:-translate-y-1
                 transition-all duration-200"
    >
      {/* Always-on gradient top bar */}
      <div className="h-1" style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD,#ec4899)" }} />

      <div className="p-5">
        <div className="flex items-start gap-4">

          {/* Avatar with gradient ring */}
          <div className="relative shrink-0">
            <div className="p-0.5 rounded-full"
              style={{ background: "linear-gradient(135deg,#3C9BF9,#9100BD)" }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center
                              text-xl font-extrabold dark:border-gray-700"
                style={{ background: "linear-gradient(135deg,#eff6ff,#faf5ff)", color: "#9100BD", border: "2px solid white" }}>
                {fullName?.charAt(0)}
              </div>
            </div>
            {verified && (
              <BadgeCheck className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-white dark:bg-gray-800 rounded-full"
                style={{ color: "#9100BD" }} />
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">

            {/* Name + verified */}
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">{fullName}</h3>
              {verified && (
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0"
                  style={{ background: "#f3e8ff", color: "#7c3aed", border: "1px solid #ddd6fe" }}>
                  ✓ Verified
                </span>
              )}
            </div>

            {/* Gender + qualifications row */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={genderStyle}>
                {genderIcon} {genderLabel}
              </span>
              {qualifications?.slice(0, 2).map((q, i) => (
                <span key={i} className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                  style={{ background: "#faf5ff", color: "#7c3aed", border: "1px solid #ede9fe" }}>
                  {q}
                </span>
              ))}
            </div>

            {/* About — 2 lines max */}
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">{about}</p>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} size={11}
                  className={s <= Math.round(rating || 0)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600"
                  } />
              ))}
              <span className="text-[11px] text-gray-400 dark:text-gray-500 ml-1">
                {rating ? `${rating} / 5` : "Not rated yet"}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 h-px" style={{ background: "linear-gradient(to right,#e9d5ff,transparent)" }} />

        {/* Footer row */}
        <div className="flex items-center justify-between gap-2 flex-wrap">

          <div className="flex items-center gap-3">
            {/* Experience */}
            <span className="flex items-center gap-1 text-xs font-medium"
              style={{ color: "#3C9BF9" }}>
              <Clock size={11} />
              {experience} yrs
            </span>

            {/* Location */}
            <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 truncate max-w-[140px]">
              <MapPin size={11} className="shrink-0 text-pink-400" />
              {address?.split(",")[0]}
            </span>
          </div>

          {/* Fee */}
          <div className="text-right shrink-0">
            <p className="text-base font-bold bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg,#3C9BF9,#9100BD)", WebkitBackgroundClip: "text" }}>
              ₹{fees}
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500">per session</p>
          </div>
        </div>
      </div>

      {/* Bottom glow on hover */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD,#ec4899)" }} />
    </Link>
  );
};