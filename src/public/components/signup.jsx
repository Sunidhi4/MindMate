import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { easeInOut, motion, AnimatePresence } from "motion/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Shield, Sparkles, UserCheck, Stethoscope } from "lucide-react";

const SignUp = () => {
  const [signupType, setSignupType]     = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [focused, setFocused]           = useState("");
  const [formData, setFormData]         = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const usernameRegex = /^[a-zA-Z0-9_@#]{8,}/;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usernameRegex.test(formData.username)) {
      toast.error("Username: letters, numbers, _ # @ only (min 8 chars)");
      return;
    }
    if (!passwordRegex.test(formData.password)) {
      toast.error("Password: 8+ chars, uppercase, number & special char required");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `https://mindmate-production-81d8.up.railway.app/public/register/${signupType}`,
        formData
      );
      if (res.status === 200) {
        toast.success("Registered successfully! Please login.");
        navigate("/login");
      } else {
        toast.error("Username already exists. Choose a different one.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = (field) => [
    "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200",
    "bg-white/60 dark:bg-gray-800/60",
    "text-gray-800 dark:text-gray-100",
    "placeholder-gray-400 dark:placeholder-gray-500",
    focused === field
      ? "border-2 border-purple-500 dark:border-purple-400 ring-2 ring-purple-200 dark:ring-purple-900/40"
      : "border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600",
  ].join(" ");

  const isUser   = signupType === "user";
  const leftBg   = isUser
    ? "linear-gradient(145deg,#5b21b6 0%,#3b82f6 60%,#9100BD 100%)"
    : "linear-gradient(145deg,#0f766e 0%,#3b82f6 60%,#6366f1 100%)";

  return (
    <div className="min-h-screen w-full bg-gradient dark:bg-gray-900 flex items-center justify-center px-4 py-10">
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        @keyframes floatOrb {
          0%,100% { transform: translateY(0px) scale(1); }
          50%      { transform: translateY(-18px) scale(1.04); }
        }
        .orb1 { animation: floatOrb 6s ease-in-out infinite; }
        .orb2 { animation: floatOrb 8s ease-in-out infinite reverse; }
        .orb3 { animation: floatOrb 7s ease-in-out infinite 2s; }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .shimmer-text {
          background: linear-gradient(90deg,#9100BD,#3C9BF9,#ec4899,#9100BD);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }

        .glass-card {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .dark .glass-card {
          background: rgba(17,24,39,0.80);
        }

        @keyframes slideIn {
          from { opacity:0; transform:translateX(-12px); }
          to   { opacity:1; transform:translateX(0); }
        }
        .slide-in { animation: slideIn 0.35s ease both; }

        /* Password strength bar */
        .strength-weak   { width:33%;  background:#ef4444; }
        .strength-medium { width:66%;  background:#f59e0b; }
        .strength-strong { width:100%; background:#10b981; }
      `}</style>

      {/* ── Floating orbs ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="orb1 absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle,#9100BD,transparent 70%)" }} />
        <div className="orb2 absolute -bottom-20 -right-10 w-80 h-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle,#3C9BF9,transparent 70%)" }} />
        <div className="orb3 absolute top-1/3 right-1/4 w-48 h-48 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle,#ec4899,transparent 70%)" }} />
      </div>

      <motion.div
        className="w-full max-w-4xl relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: easeInOut }}
      >
        <div className="glass-card rounded-3xl border border-white/40 dark:border-gray-700/60
                        shadow-2xl shadow-purple-200/30 dark:shadow-purple-900/20
                        overflow-hidden flex flex-col md:flex-row">

          {/* ══ LEFT PANEL ══ */}
          <motion.div
            className="md:w-5/12 relative flex flex-col justify-between p-8 text-white overflow-hidden"
            animate={{ background: leftBg }}
            transition={{ duration: 0.6 }}
            style={{ background: leftBg }}
          >
            {/* dot pattern */}
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle,white 1px,transparent 1px)", backgroundSize: "20px 20px" }} />

            <div className="relative z-10">
              {/* Brand */}
              <div className="flex items-center gap-2.5 mb-8">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <Sparkles size={18} className="text-white" />
                </div>
                <span className="text-lg font-bold tracking-tight">MindMate</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={signupType}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}>

                  <div className="flex items-center gap-2 mb-3">
                    {isUser
                      ? <UserCheck size={22} className="text-white/80" />
                      : <Stethoscope size={22} className="text-white/80" />
                    }
                    <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
                      {isUser ? "User Account" : "Expert Account"}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-3">
                    {isUser ? "Join our community 💜" : "Share your expertise 🩺"}
                  </h2>
                  <p className="text-white/75 text-sm leading-relaxed mb-6">
                    {isUser
                      ? "A safe, anonymous space to share, heal, and connect with others who understand."
                      : "Help people on their mental health journey with your professional guidance."
                    }
                  </p>

                  {/* Privacy note for users */}
                  {isUser && (
                    <div className="bg-white/10 border border-white/20 rounded-xl p-3 text-xs text-white/80 leading-relaxed">
                      ⚠️ Use a <strong>display name</strong> — not your real name.
                      Only your username is visible to others. All other info stays private.
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom trust note */}
            <div className="relative z-10 mt-8 flex items-center gap-2 text-white/60 text-xs">
              <Shield size={13} />
              <span>Your data is always private & encrypted</span>
            </div>
          </motion.div>

          {/* ══ RIGHT PANEL: FORM ══ */}
          <div className="md:w-7/12 p-8 sm:p-10 flex flex-col justify-center">

            <div className="h-0.5 w-12 rounded-full mb-6"
              style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD)" }} />

            {/* Title */}
            <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Create account
              </h2>
              {/* Toggle pill */}
              <button
                onClick={() => setSignupType(isUser ? "expert" : "user")}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
                style={{
                  background: isUser
                    ? "linear-gradient(90deg,rgba(99,102,241,0.1),rgba(59,130,246,0.1))"
                    : "linear-gradient(90deg,rgba(15,118,110,0.1),rgba(99,102,241,0.1))",
                  border: `1px solid ${isUser ? "#818cf8" : "#2dd4bf"}`,
                  color: isUser ? "#6366f1" : "#0f766e",
                }}
              >
                {isUser
                  ? <><Stethoscope size={12} /> Switch to Expert</>
                  : <><UserCheck size={12} /> Switch to User</>
                }
              </button>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-7">
              Already have an account?{" "}
              <Link to="/login"
                className="font-semibold text-purple-600 dark:text-purple-400 hover:text-blue-500 transition-colors">
                Sign in
              </Link>
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Username */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5
                                   text-gray-500 dark:text-gray-400">
                  Username
                </label>
                <input
                  type="text" name="username"
                  placeholder="Choose a display name"
                  value={formData.username}
                  onChange={handleChange}
                  onFocus={() => setFocused("username")}
                  onBlur={() => setFocused("")}
                  className={inputCls("username")}
                  required
                />
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                  Letters, numbers, _ # @ only · min 8 characters
                </p>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5
                                   text-gray-500 dark:text-gray-400">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused("")}
                    className={inputCls("password")}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2
                               text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                  >
                    {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>

                {/* Password strength indicator */}
                {formData.password.length > 0 && (
                  <div className="mt-2">
                    <div className="h-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          formData.password.length < 6 ? "strength-weak"
                          : passwordRegex.test(formData.password) ? "strength-strong"
                          : "strength-medium"
                        }`}
                      />
                    </div>
                    <p className={`text-[10px] mt-0.5 font-medium ${
                      formData.password.length < 6 ? "text-red-500"
                      : passwordRegex.test(formData.password) ? "text-green-500"
                      : "text-amber-500"
                    }`}>
                      {formData.password.length < 6 ? "Too short"
                        : passwordRegex.test(formData.password) ? "Strong password ✓"
                        : "Add uppercase, number & special char"}
                    </p>
                  </div>
                )}

                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                  Min 8 chars · uppercase · number · special character
                </p>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl text-sm font-bold text-white mt-2
                           transition-all duration-200
                           hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-300/30
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0
                           flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD)" }}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  `Create ${isUser ? "User" : "Expert"} Account`
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              <span className="text-xs text-gray-400 dark:text-gray-500">secure signup</span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            </div>

            <p className="text-[11px] text-center text-gray-400 dark:text-gray-500">
              🔒 Your account is encrypted and protected.
            </p>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-center mt-5 text-xs text-gray-400 dark:text-gray-500">
          <span className="shimmer-text font-semibold">MindMate</span>
          {" "}· Share. Support. Heal. 💜
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;