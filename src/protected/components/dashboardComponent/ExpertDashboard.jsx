import { useEffect, useState } from "react";
import axios from "axios";
import {
  Star, MapPin, BadgeCheck, Calendar, Clock, Shield,
  BookOpen, Users, AlertTriangle, CheckCircle2, ChevronRight,
  Sparkles, Heart, MessageCircle, Upload, Activity,
} from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import Snapshots from "./Snapshots";

/* ── Animated counter ── */
const Counter = ({ target, suffix = "" }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let n = 0;
    const step = Math.ceil(target / 60);
    const t = setInterval(() => {
      n += step;
      if (n >= target) { setVal(target); clearInterval(t); }
      else setVal(n);
    }, 20);
    return () => clearInterval(t);
  }, [target]);
  return <span>{val.toLocaleString()}{suffix}</span>;
};

const ExpertDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark]   = useState(
    () => document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    axios.get("https://mindmate-production-81d8.up.railway.app/expert/myProfile", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then(res => setProfile(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);


  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const name = profile?.fullName || localStorage.getItem("username") || "Doctor";

  const age = profile?.dob
    ? Math.floor((Date.now() - new Date(profile.dob)) / (365.25 * 24 * 60 * 60 * 1000))
    : null;

  const formattedJoin = profile?.joiningDate
    ? new Date(profile.joiningDate).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    : "—";

  // ── Colour helpers ──
  const card = (extra = "") =>
    `rounded-2xl overflow-hidden shadow-sm transition-all duration-200 ${extra}`;
  const cardBg = { background: isDark ? "rgba(255,255,255,0.04)" : "white", border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#ede9fe"}` };
  const muted  = { color: isDark ? "#9ca3af" : "#6b7280" };
  const strong = { color: isDark ? "#f9fafb" : "#111827" };

  if (!loading && profile && !profile.verified) {
  return <Navigate to="/expert/verification" replace />;
}

  return (
    <div
      className="min-h-full w-full transition-colors duration-300"
      style={{ background: isDark ? "#111827" : "linear-gradient(160deg,#f5f3ff 0%,#eff6ff 50%,#fdf4ff 100%)" }}
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-up { animation: fadeUp 0.5s ease both; }
        .section-divider { border:none; height:1px; margin:0; background: linear-gradient(to right,transparent,#ddd6fe,transparent); }
        .dark .section-divider { background: linear-gradient(to right,transparent,#374151,transparent); }
      `}</style>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-5">

        {/* ══ HERO WELCOME ══ */}
        <div className={`${card("hover:shadow-lg fade-up")} relative`} style={cardBg}>
          <div className="h-1" style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD,#ec4899)" }} />

          <div className="p-6 flex flex-col md:flex-row items-start md:items-center gap-6">

            {/* Avatar */}
            {loading ? (
              <div className="w-20 h-20 rounded-full animate-pulse shrink-0"
                style={{ background: isDark ? "rgba(255,255,255,0.08)" : "#e9d5ff" }} />
            ) : (
              <div className="relative shrink-0">
                <div className="p-0.5 rounded-full"
                  style={{ background: "linear-gradient(135deg,#3C9BF9,#9100BD)" }}>
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-extrabold"
                    style={{ background: isDark ? "#1f2937" : "#f3e8ff", color: "#9100BD", border: "3px solid white" }}>
                    {name.charAt(0).toUpperCase()}
                  </div>
                </div>
                {profile?.verified && (
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center shadow"
                    style={{ background: isDark ? "#1f2937" : "white" }}>
                    <BadgeCheck size={18} style={{ color: "#9100BD" }} />
                  </div>
                )}
              </div>
            )}

            {/* Info */}
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{ color: isDark ? "#c084fc" : "#9100BD", background: isDark ? "rgba(145,0,189,0.15)" : "white", border: `1px solid ${isDark ? "rgba(145,0,189,0.3)" : "#ddd6fe"}` }}>
                  <Sparkles size={10} className="inline mr-1" /> Expert Panel
                </span>
                {profile?.verified && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: "#f3e8ff", color: "#7c3aed", border: "1px solid #ddd6fe" }}>
                    ✓ Verified Expert
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight" style={strong}>
                {greeting},{" "}
                <span style={{ background: "linear-gradient(90deg,#9100BD,#3C9BF9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {loading ? "Doctor" : name}
                </span>{" "}👋
              </h1>

              {profile && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {[
                    { icon: <Clock size={11} />,   color: "#3C9BF9", text: `${profile.experience} yrs experience` },
                    { icon: <MapPin size={11} />,  color: "#ec4899", text: profile.address },
                    { icon: <Calendar size={11} />,color: "#10b981", text: `Joined ${formattedJoin}` },
                  ].map((m, i) => (
                    <span key={i} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{ background: isDark ? "rgba(255,255,255,0.05)" : "#f8f7ff", color: m.color, border: `1px solid ${m.color}25` }}>
                      {m.icon} {m.text}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Quick links */}
            <div className="flex flex-col gap-2 shrink-0">
              <Link to="/expert/appointments"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
                style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD)" }}>
                <Calendar size={14} /> My Appointments
              </Link>
              <Link to="/expert/motivations"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-90"
                style={{ background: isDark ? "rgba(255,255,255,0.06)" : "#faf5ff", color: "#9100BD", border: "1px solid #ddd6fe" }}>
                <Upload size={14} /> Share a Post
              </Link>
            </div>
          </div>

          {/* Qualifications bar */}
          {profile?.qualifications?.length > 0 && (
            <div className="px-6 pb-5 flex flex-wrap gap-2">
              {profile.qualifications.map((q, i) => (
                <span key={i} className="text-xs font-medium px-3 py-1 rounded-full"
                  style={{ background: isDark ? "rgba(145,0,189,0.12)" : "#faf5ff", color: "#7c3aed", border: "1px solid #ede9fe" }}>
                  🎓 {q}
                </span>
              ))}
              {age && (
                <span className="text-xs font-medium px-3 py-1 rounded-full"
                  style={{ background: isDark ? "rgba(60,155,249,0.12)" : "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe" }}>
                  🎂 {age} years old
                </span>
              )}
              <span className="text-xs font-medium px-3 py-1 rounded-full"
                style={{ background: isDark ? "rgba(16,185,129,0.12)" : "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" }}>
                💰 ₹{profile.fees} / 15 min
              </span>
            </div>
          )}
        </div>

        <Snapshots/>

        {/* ══ NAVIGATION GUIDE ══ */}
        <div className={card()} style={cardBg}>
          <div className="h-1" style={{ background: "linear-gradient(90deg,#9100BD,#3C9BF9)" }} />
          <div className="p-5">
            <div className="flex items-center gap-2 mb-5">
              <BookOpen size={17} className="text-purple-500" />
              <h2 className="text-base font-bold" style={strong}>How PsychoTalk Works for Experts</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  step: "01", color: "#9100BD", icon: <Users size={18} />,
                  title: "Receive Appointment Requests",
                  desc: "Users browse the expert directory and send session requests. You'll see them in 'My Appointments' under the REQUESTED tab.",
                },
                {
                  step: "02", color: "#3C9BF9", icon: <CheckCircle2 size={18} />,
                  title: "Confirm or Cancel",
                  desc: "Review the reason and timing. Confirm to move the appointment to payment phase, or cancel if you're unavailable.",
                },
                {
                  step: "03", color: "#ec4899", icon: <Heart size={18} />,
                  title: "User Completes Payment",
                  desc: "After your confirmation, the user pays via Razorpay. The appointment status changes to SCHEDULED automatically.",
                },
                {
                  step: "04", color: "#10b981", icon: <Star size={18} />,
                  title: "Conduct & Complete Session",
                  desc: "Hold the session at the scheduled time. Mark it as COMPLETED in your appointments dashboard once done.",
                },
                {
                  step: "05", color: "#f59e0b", icon: <Upload size={18} />,
                  title: "Share Motivational Posts",
                  desc: "Only experts can post images to the Motivations gallery. Share uplifting content to inspire the community.",
                },
                {
                  step: "06", color: "#6366f1", icon: <MessageCircle size={18} />,
                  title: "Engage with Community",
                  desc: "Answer questions in the Reflections (Support) section. Your expertise helps users feel heard and supported.",
                },
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ background: isDark ? "rgba(255,255,255,0.03)" : "#f8f7ff", border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#ede9fe"}` }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${s.color}15`, color: s.color, border: `1px solid ${s.color}25` }}>
                    {s.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold" style={{ color: s.color }}>{s.step}</span>
                      <p className="text-sm font-bold" style={strong}>{s.title}</p>
                    </div>
                    <p className="text-xs leading-relaxed" style={muted}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ QUICK NAVIGATION ══ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "My Appointments", desc: "View & manage patient sessions", path: "/expert/appointments", color: "#9100BD", icon: <Calendar size={20} /> },
            { label: "Motivational Posts", desc: "Share images with the community", path: "/expert/motivations", color: "#3C9BF9", icon: <Upload size={20} /> },
            { label: "Community Reflections", desc: "Answer user questions & posts", path: "/expert/support", color: "#ec4899", icon: <MessageCircle size={20} /> },
          ].map((nav, i) => (
            <Link key={i} to={nav.path}
              className={`${card("hover:shadow-lg hover:-translate-y-1 group flex items-center gap-4 p-5")}`}
              style={cardBg}>
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                style={{ background: `${nav.color}15`, color: nav.color, border: `1px solid ${nav.color}25` }}>
                {nav.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-sm" style={strong}>{nav.label}</p>
                <p className="text-xs mt-0.5" style={muted}>{nav.desc}</p>
              </div>
              <ChevronRight size={16} style={{ color: nav.color }} />
            </Link>
          ))}
        </div>

        {/* ══ TWO COLUMN: Rules + About ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Rules & Regulations */}
          <div className={card()} style={cardBg}>
            <div className="h-1" style={{ background: "linear-gradient(90deg,#ef4444,#f59e0b)" }} />
            <div className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Shield size={17} style={{ color: "#ef4444" }} />
                <h2 className="text-base font-bold" style={strong}>Expert Code of Conduct</h2>
              </div>

              <div className="space-y-3">
                {[
                  { icon: "✅", text: "Maintain professional language and tone in all interactions with users." },
                  { icon: "✅", text: "Respond to confirmed appointments at the scheduled time. Notify users promptly if you need to reschedule." },
                  { icon: "✅", text: "Keep all user information and session content strictly confidential." },
                  { icon: "✅", text: "Only share motivational content that is accurate, compassionate, and evidence-based." },
                  { icon: "✅", text: "Refer users to emergency services if they express immediate risk to themselves or others." },
                  { icon: "🚫", text: "Do not solicit users for off-platform sessions, personal contact, or financial dealings." },
                  { icon: "🚫", text: "Do not share, sell, or misuse any user data under any circumstances." },
                  { icon: "🚫", text: "Do not post offensive, misleading, or unverified health claims in motivational posts." },
                  { icon: "🚫", text: "Do not cancel appointments repeatedly — it affects your rating and user trust." },
                ].map((r, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-base shrink-0 mt-0.5">{r.icon}</span>
                    <p className="text-xs leading-relaxed" style={muted}>{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* About PsychoTalk */}
          <div className="flex flex-col gap-3">

            {/* Mission */}
            <div className={card()} style={cardBg}>
              <div className="h-1" style={{ background: "linear-gradient(90deg,#10b981,#3C9BF9)" }} />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Heart size={16} style={{ color: "#10b981" }} />
                  <h2 className="text-sm font-bold" style={strong}>Our Mission</h2>
                </div>
                <p className="text-xs leading-relaxed" style={muted}>
                  PsychoTalk is a safe, anonymous platform for mental health support. We connect
                  individuals facing emotional and psychological challenges with compassionate peers
                  and verified experts — removing stigma, one conversation at a time.
                </p>
              </div>
            </div>

            {/* Your role */}
            <div className="rounded-2xl p-5 text-white"
              style={{ background: "linear-gradient(135deg,#7c3aed,#3b82f6)" }}>
              <BadgeCheck size={20} className="mb-3 opacity-80" />
              <p className="font-bold text-sm mb-2">Your Role as an Expert</p>
              <p className="text-xs text-white/80 leading-relaxed">
                You are the backbone of professional support on PsychoTalk. Your sessions give users
                access to qualified guidance they may not be able to get otherwise. Every session you
                conduct, every post you share, and every question you answer has real impact.
              </p>
              <p className="text-xs text-white/60 mt-3">
                ⭐ Maintain a high rating to stay featured in the expert directory.
              </p>
            </div>

            {/* Verification status */}
            {profile && (
              <div className={card()} style={cardBg}>
                <div className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: profile.verified ? "#f0fdf4" : "#fffbeb", color: profile.verified ? "#15803d" : "#d97706" }}>
                    {profile.verified ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={strong}>
                      {profile.verified ? "Account Verified ✓" : "Verification Pending"}
                    </p>
                    <p className="text-[11px]" style={muted}>
                      {profile.verified
                        ? "Your credentials have been verified. You're fully active on the platform."
                        : "Your verification is under review. You'll be notified once approved."}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ══ TIPS TICKER ══ */}
        <div className="rounded-xl py-3 overflow-hidden"
          style={{ background: isDark ? "rgba(255,255,255,0.03)" : "white", border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#ede9fe"}` }}>
          <style>{`.expert-ticker { display:flex; white-space:nowrap; animation:ticker 30s linear infinite; gap:3rem; } @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`}</style>
          <div className="expert-ticker select-none">
            {[
              "Always be punctual for sessions ✦",
              "Patient confidentiality is non-negotiable ✦",
              "Your expertise changes lives ✦",
              "One kind word can make all the difference ✦",
              "Stay updated with the latest mental health research ✦",
              "Boundaries protect both you and your patients ✦",
              "Always be punctual for sessions ✦",
              "Patient confidentiality is non-negotiable ✦",
              "Your expertise changes lives ✦",
              "One kind word can make all the difference ✦",
              "Stay updated with the latest mental health research ✦",
              "Boundaries protect both you and your patients ✦",
            ].map((t, i) => (
              <span key={i} className="text-xs font-medium" style={{ color: isDark ? "#7c3aed" : "#9100BD", opacity: 0.7 }}>{t}</span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ExpertDashboard;