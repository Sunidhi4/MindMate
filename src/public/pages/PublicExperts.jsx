import axios from "axios";
import { useEffect, useState } from "react";
import { BadgeCheck, MapPin, Star, Clock, Users, ChevronRight, Sparkles, LogIn, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SkeletonCard = () => (
  <div className="animate-pulse rounded-2xl border border-purple-100 dark:border-gray-700
                  bg-white dark:bg-gray-800 p-5 flex flex-col gap-3">
    <div className="flex items-center gap-3">
      <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
      </div>
    </div>
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
    <div className="flex justify-between mt-2">
      <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-full" />
      <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
    </div>
  </div>
);

/* ══ LOGIN PROMPT MODAL ══ */
const LoginPrompt = ({ expert, onClose, onLogin }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center px-4"
    style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
    onClick={onClose}
  >
    <div
      className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl
                 bg-white dark:bg-gray-800"
      onClick={e => e.stopPropagation()}
    >
      {/* accent bar */}
      <div style={{ height: 4, background: "linear-gradient(90deg,#3C9BF9,#9100BD,#ec4899)" }} />

      <div className="p-6">
        {/* close */}
        <div className="flex justify-end mb-2">
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400
                       hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Expert preview */}
        <div className="flex flex-col items-center text-center mb-5">
          <div className="p-0.5 rounded-full mb-3"
            style={{ background: "linear-gradient(135deg,#3C9BF9,#9100BD)" }}>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-extrabold"
              style={{ background: "linear-gradient(135deg,#eff6ff,#faf5ff)", color: "#9100BD", border: "2px solid white" }}
            >
              {expert?.fullName?.charAt(0)}
            </div>
          </div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">{expert?.fullName}</h3>
          {expert?.qualifications?.length > 0 && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              {expert.qualifications.slice(0, 2).join(" · ")}
            </p>
          )}
        </div>

        {/* Message */}
        <div
          className="rounded-xl p-4 mb-5 text-center"
          style={{ background: "linear-gradient(135deg,#faf5ff,#eff6ff)", border: "1px solid #ddd6fe" }}
        >
          <LogIn size={20} className="mx-auto mb-2 text-purple-500" />
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">
            Login to view full profile
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Create a free account or log in to view expert details and book a confidential session.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            onClick={onLogin}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white
                       transition-all hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD)" }}
          >
            Login / Sign Up
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-sm font-medium
                       text-gray-600 dark:text-gray-400
                       border border-gray-200 dark:border-gray-600
                       bg-gray-50 dark:bg-gray-700/50
                       hover:border-purple-300 hover:text-purple-600 transition-colors"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  </div>
);

/* ══ MAIN COMPONENT ══ */
const PublicExperts = () => {
  const navigate = useNavigate();
  const [experts, setExperts]           = useState([]);
  const [loading, setLoading]           = useState(true);
  const [promptExpert, setPromptExpert] = useState(null);

  useEffect(() => {
    async function getAllExperts() {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:8080/public/getAllExperts");
        setExperts(res.data.content);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    getAllExperts();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient dark:bg-gray-900">
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        .expert-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .expert-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(145,0,189,0.13); }
      `}</style>

      {/* Login prompt modal */}
      {promptExpert && (
        <LoginPrompt
          expert={promptExpert}
          onClose={() => setPromptExpert(null)}
          onLogin={() => navigate("/login")}
        />
      )}

      <div className="w-full max-w-6xl mx-auto px-4 py-10">

        {/* ══ HEADER ══ */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase
                           text-purple-600 dark:text-purple-400
                           bg-purple-100 dark:bg-purple-900/30
                           px-3 py-1 rounded-full
                           border border-purple-200 dark:border-purple-700/50 mb-3">
            <Sparkles size={11} /> Our Experts
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Meet Our{" "}
            <span style={{
              background: "linear-gradient(90deg,#9100BD,#3C9BF9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Certified Professionals
            </span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Connect with qualified mental health experts ready to support your journey.
          </p>
          <div className="mt-6 h-px max-w-xs mx-auto"
            style={{ background: "linear-gradient(to right,transparent,#ddd6fe,transparent)" }} />
        </div>

        {/* ══ GRID ══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          ) : experts && experts.length > 0 ? (
            experts.map((expert) => (
              <div
                key={expert.id}
                className="expert-card rounded-2xl overflow-hidden
                           bg-white dark:bg-gray-800
                           border border-purple-100 dark:border-gray-700 shadow-sm"
              >
                <div className="h-1" style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD,#ec4899)" }} />

                <div className="p-5">
                  {/* Avatar + name */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="relative shrink-0">
                      <div className="p-0.5 rounded-full"
                        style={{ background: "linear-gradient(135deg,#3C9BF9,#9100BD)" }}>
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-extrabold"
                          style={{ background: "linear-gradient(135deg,#eff6ff,#faf5ff)", color: "#9100BD", border: "2px solid white" }}
                        >
                          {expert.fullName?.charAt(0)}
                        </div>
                      </div>
                      {expert.verified && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full
                                        bg-white dark:bg-gray-800 flex items-center justify-center shadow">
                          <BadgeCheck size={14} style={{ color: "#9100BD" }} />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                          {expert.fullName}
                        </h3>
                        {expert.verified && (
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0"
                            style={{ background: "#f3e8ff", color: "#7c3aed", border: "1px solid #ddd6fe" }}>
                            ✓ Verified
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {expert.qualifications?.slice(0, 2).map((q, i) => (
                          <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                            style={{ background: "#faf5ff", color: "#7c3aed", border: "1px solid #ede9fe" }}>
                            {q}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* About */}
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-3">
                    {expert.about}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={11}
                        className={s <= Math.round(expert.rating || 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600"
                        } />
                    ))}
                    <span className="text-[11px] text-gray-400 dark:text-gray-500 ml-1">
                      {expert.rating ? `${expert.rating} / 5` : "Not rated yet"}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="h-px mb-3"
                    style={{ background: "linear-gradient(to right,#e9d5ff,transparent)" }} />

                  {/* Footer */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1 text-xs font-medium" style={{ color: "#3C9BF9" }}>
                        <Clock size={11} /> {expert.experience} yrs exp
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <MapPin size={11} className="text-pink-400 shrink-0" />
                        <span className="truncate max-w-[100px]">{expert.address?.split(",")[0]}</span>
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-bold" style={{
                        background: "linear-gradient(90deg,#3C9BF9,#9100BD)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                      }}>
                        ₹{expert.fees}
                      </p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500">per session</p>
                    </div>
                  </div>

                  {/* ── View Profile → triggers login prompt ── */}
                  <button
                    onClick={() => setPromptExpert(expert)}
                    className="w-full py-2 rounded-xl text-xs font-semibold
                               text-purple-600 dark:text-purple-400
                               border border-purple-200 dark:border-purple-700/50
                               bg-purple-50 dark:bg-purple-900/20
                               hover:bg-purple-100 dark:hover:bg-purple-900/40
                               transition-colors flex items-center justify-center gap-1"
                  >
                    View Profile <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16
                            bg-white dark:bg-gray-800 rounded-2xl
                            border border-purple-100 dark:border-gray-700 shadow-sm">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-gray-600 dark:text-gray-300 font-medium text-sm">No experts found.</p>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">Please check back soon.</p>
            </div>
          )}
        </div>

        {/* ══ BOTTOM CTA ══ */}
        {!loading && experts.length > 0 && (
          <div className="mt-10 rounded-2xl p-6 sm:p-8 text-center text-white"
            style={{ background: "linear-gradient(135deg,#7c3aed,#3b82f6)" }}>
            <Users className="mx-auto mb-3 opacity-80" size={22} />
            <p className="font-bold text-base mb-1">Ready to take the first step?</p>
            <p className="text-xs text-white/75 mb-4 max-w-sm mx-auto">
              Our experts are here to guide you. Book a session today and start your journey toward healing.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl
                         text-sm font-semibold text-purple-600
                         bg-white shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              Get Started <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicExperts;