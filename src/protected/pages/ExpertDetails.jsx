import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft, FaStar, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import axios from "axios";

const ExpertDetails = () => {
  const location  = useLocation();
  const navigate  = useNavigate();
  const [expert, setExpert]       = useState(null);
  const [loading, setLoading]     = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const expertId = location.state?.expertId;

  useEffect(() => {
    const getExpertObject = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:8080/public/getExpert/${expertId}`);
        if (res.status === 200) setExpert(res.data);
        else { toast.error("Expert not found"); navigate(-1); }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load expert details");
      } finally {
        setLoading(false);
      }
    };
    if (expertId) getExpertObject();
  }, [expertId]);

  /* ── Loading ── */
  if (loading) return (
    <div className="min-h-full w-full bg-gradient dark:bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-4 animate-pulse">
        <div className="h-56 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
      </div>
    </div>
  );

  /* ── No data ── */
  if (!expert) return (
    <div className="min-h-full w-full bg-gradient dark:bg-gray-900
                    flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
      No expert data found. Please go back and try again.
    </div>
  );

  const formattedJoining = new Date(expert.joiningDate).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });

  const age = expert.dob
    ? Math.floor((new Date() - new Date(expert.dob)) / (365.25 * 24 * 60 * 60 * 1000))
    : null;

  const tabs = ["about", "qualifications", "details"];

  return (
    <div className="min-h-full w-full bg-gradient dark:bg-gray-900">
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .tab-btn { transition: all 0.18s ease; background: none; border: none; cursor: pointer; }
        .book-btn { transition: all 0.2s ease; }
        .book-btn:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(145,0,189,0.25); }

        /* light info pill */
        .info-pill {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 14px; border-radius: 12px;
          background: #f8f7ff; border: 1px solid #ede9fe;
        }
        /* dark info pill */
        .dark .info-pill {
          background: rgba(109,40,217,0.08);
          border-color: rgba(109,40,217,0.2);
        }

        /* light qual tag */
        .qual-tag {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 14px; border-radius: 20px;
          background: #faf5ff; border: 1px solid #ddd6fe;
          font-size: 13px; color: #5b21b6; font-weight: 500;
        }
        /* dark qual tag */
        .dark .qual-tag {
          background: rgba(109,40,217,0.12);
          border-color: rgba(109,40,217,0.25);
          color: #c084fc;
        }

        .section-divider {
          border: none; height: 1px;
          background: linear-gradient(to right, transparent, #ddd6fe, transparent);
        }
        .dark .section-divider {
          background: linear-gradient(to right, transparent, #374151, transparent);
        }
      `}</style>

      <div className="w-full mx-auto px-10 py-6 flex flex-col gap-5">

        {/* ══ HERO CARD ══ */}
        <div className="w-full rounded-2xl overflow-hidden shadow-sm
                        bg-white dark:bg-gray-800
                        border border-purple-100 dark:border-gray-700">
          <div style={{ height: 4, background: "linear-gradient(90deg,#3C9BF9,#9100BD)" }} />

          <div className="px-5 pt-5 pb-6">

            {/* Back button */}
            <button onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-sm font-medium mb-5 transition
                         text-purple-600 dark:text-purple-400
                         hover:text-blue-500 dark:hover:text-blue-400">
              <FaArrowLeft size={12} /> Back
            </button>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">

              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center
                                text-3xl sm:text-4xl font-extrabold"
                  style={{ background: "#f3e8ff", border: "3px solid #9100BD", color: "#9100BD" }}>
                  {expert.fullName?.charAt(0)}
                </div>
                {expert.verified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center shadow
                                  bg-white dark:bg-gray-800">
                    <FaCheckCircle size={16} style={{ color: "#9100BD" }} />
                  </div>
                )}
              </div>

              {/* Name / rating / pills */}
              <div className="flex-1 min-w-0 text-center sm:text-left space-y-2">

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    {expert.fullName}
                  </h1>
                  {expert.verified && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: "#f3e8ff", color: "#7c3aed", border: "1px solid #ddd6fe" }}>
                      ✓ Verified
                    </span>
                  )}
                </div>

                {/* Stars */}
                <div className="flex items-center justify-center sm:justify-start gap-1">
                  {[1,2,3,4,5].map(s => (
                    <FaStar key={s} size={13}
                      style={{ color: s <= Math.round(expert.rating || 0) ? "#f59e0b" : "#d1d5db" }} />
                  ))}
                  <span className="text-sm ml-1 text-gray-500 dark:text-gray-400">
                    {expert.rating ? `${expert.rating} / 5` : "Not rated yet"}
                  </span>
                </div>

                {/* Meta pills */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  <span className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{ background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe" }}>
                    🩺 {expert.experience} yrs experience
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{ background: "#faf5ff", color: "#7c3aed", border: "1px solid #ddd6fe" }}>
                    <FaMapMarkerAlt className="inline mr-1" size={10} />
                    {expert.address?.split(",")[0]}
                  </span>
                  {expert.gender && (
                    <span className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{ background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" }}>
                      {expert.gender === "MALE" ? "♂" : "♀"}{" "}
                      {expert.gender.charAt(0) + expert.gender.slice(1).toLowerCase()}
                    </span>
                  )}
                </div>
              </div>

              {/* Fee + Book — desktop */}
              <div className="hidden sm:flex flex-col items-end gap-3 shrink-0">
                <div className="text-right">
                  <p className="text-xs uppercase tracking-wide font-medium
                                text-gray-400 dark:text-gray-500">
                    Consultation Fee
                  </p>
                  <p className="text-2xl font-bold" style={{ color: "#3C9BF9" }}>₹{expert.fees}</p>
                </div>
                <Link to="/user/bookAppointment" state={{ expert }}
                  className="book-btn px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm"
                  style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD)" }}>
                  Book a Session
                </Link>
              </div>
            </div>

            {/* Fee + Book — mobile */}
            <div className="sm:hidden mt-5 flex items-center justify-between p-4 rounded-xl
                            border border-purple-100 dark:border-gray-700
                            bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-700">
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500">Consultation Fee</p>
                <p className="text-xl font-bold" style={{ color: "#3C9BF9" }}>₹{expert.fees}</p>
              </div>
              <Link to="/user/bookAppointment" state={{ expert }}
                className="book-btn px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD)" }}>
                Book a Session
              </Link>
            </div>
          </div>
        </div>

        {/* ══ TABS CARD ══ */}
        <div className="w-full rounded-2xl overflow-hidden shadow-sm
                        bg-white dark:bg-gray-800
                        border border-purple-100 dark:border-gray-700">
          <div style={{ height: 4, background: "linear-gradient(90deg,#3C9BF9,#9100BD)" }} />

          {/* Tab nav */}
          <div className="flex border-b border-gray-100 dark:border-gray-700 px-4 pt-3 overflow-x-auto">
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="tab-btn px-4 sm:px-5 py-2.5 text-sm font-semibold capitalize mr-1 shrink-0"
                style={{
                  color: activeTab === tab ? "#9100BD" : "#6b7280",
                  borderBottom: activeTab === tab ? "2px solid #9100BD" : "2px solid transparent",
                  background: activeTab === tab ? "#faf5ff" : "transparent",
                  borderRadius: "8px 8px 0 0",
                }}>
                {tab}
              </button>
            ))}
          </div>

          {/* ── About ── */}
          {activeTab === "about" && (
            <div className="p-5 sm:p-6 space-y-5">
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {expert.about}
              </p>

              <hr className="section-divider" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: "📍", text: expert.address },
                  { icon: "📅", text: `Member since ${formattedJoining}` },
                  { icon: "🩺", text: `${expert.experience} years of experience` },
                  ...(age ? [{ icon: "🎂", text: `${age} years old` }] : []),
                ].map((item, i) => (
                  <div key={i} className="info-pill">
                    <span>{item.icon}</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Qualifications ── */}
          {activeTab === "qualifications" && (
            <div className="p-5 sm:p-6 space-y-5">
              {expert.qualifications && expert.qualifications.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {expert.qualifications.map((q, i) => (
                    <span key={i} className="qual-tag">🎓 {q}</span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 dark:text-gray-500">No qualifications listed.</p>
              )}

              <hr className="section-divider" />

              <div className="flex items-center gap-4 p-4 rounded-xl
                              border border-purple-100 dark:border-gray-700
                              bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-700">
                <div className="w-12 h-12 rounded-full flex items-center justify-center
                                font-bold text-white text-base shrink-0"
                  style={{ background: "linear-gradient(135deg,#3C9BF9,#9100BD)" }}>
                  {expert.experience}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">
                    {expert.experience} Years of Experience
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Practising since {new Date().getFullYear() - parseInt(expert.experience)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── Details ── */}
          {activeTab === "details" && (
            <div className="p-5 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "Full Name",  value: expert.fullName, icon: "👤" },
                  { label: "Gender",     value: expert.gender ? expert.gender.charAt(0) + expert.gender.slice(1).toLowerCase() : "—", icon: "⚧" },
                  { label: "Age",        value: age ? `${age} years` : "—", icon: "🎂" },
                  { label: "Address",    value: expert.address, icon: "📍" },
                  { label: "Joined On",  value: formattedJoining, icon: "🗓" },
                  { label: "Experience", value: `${expert.experience} years`, icon: "🩺" },
                  { label: "Verified",   value: expert.verified ? "Yes ✓" : "No", icon: "🔒" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-0.5 p-3 rounded-xl
                                          border border-purple-100 dark:border-gray-700
                                          bg-purple-50/50 dark:bg-gray-700/40">
                    <span className="text-[11px] font-semibold uppercase tracking-wide
                                     text-gray-400 dark:text-gray-500">
                      {item.icon} {item.label}
                    </span>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ExpertDetails;