import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, easeInOut } from "motion/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { Shield, Sparkles } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [focused, setFocused]           = useState("");
  const [formData, setFormData]         = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/public/login", formData);
      if (res.data.token) {
        toast.success("Login successful!");
        const { token, role, username, id } = res.data;
        localStorage.setItem("role", role);
        localStorage.setItem("username", username);
        localStorage.setItem("token", token);
        localStorage.setItem("id", id);
        if (role === "USER")        navigate("/user/dashboard");
        else if (role === "EXPERT") navigate("/expert/dashboard");
        else                        toast.error("Admin login not allowed here");
      } else {
        toast.error(res.data.errorMsg);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
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

  const features = [
    { icon: "🛡️", text: "Safe & Anonymous" },
    { icon: "💜", text: "Peer Support"      },
    { icon: "👨‍⚕️", text: "Expert Guidance"  },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient dark:bg-gray-900 flex items-center justify-center px-4 py-10">
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-18px) scale(1.04); }
        }
        .orb1 { animation: floatOrb 6s ease-in-out infinite; }
        .orb2 { animation: floatOrb 8s ease-in-out infinite reverse; }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #9100BD, #3C9BF9, #ec4899, #9100BD);
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
      `}</style>

      {/* ── Decorative floating orbs ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="orb1 absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle,#9100BD,transparent 70%)" }} />
        <div className="orb2 absolute -bottom-20 -right-10 w-80 h-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle,#3C9BF9,transparent 70%)" }} />
        <div className="orb1 absolute top-1/2 left-1/3 w-48 h-48 rounded-full opacity-10"
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
          <div className="md:w-5/12 relative flex flex-col justify-between p-8 text-white overflow-hidden"
            style={{ background: "linear-gradient(145deg,#5b21b6 0%,#3b82f6 60%,#9100BD 100%)" }}>

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

              <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-3">
                Welcome back 👋
              </h2>
              <p className="text-white/75 text-sm leading-relaxed mb-8">
                Your safe space to share, heal, and grow. We're glad you're here.
              </p>

              {/* Feature list */}
              <div className="space-y-3">
                {features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center text-base shrink-0">
                      {f.icon}
                    </div>
                    <span className="text-sm font-medium text-white/90">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom trust note */}
            <div className="relative z-10 mt-8 flex items-center gap-2 text-white/60 text-xs">
              <Shield size={13} />
              <span>Your data is always private & encrypted</span>
            </div>
          </div>

          {/* ══ RIGHT PANEL: FORM ══ */}
          <div className="md:w-7/12 p-8 sm:p-10 flex flex-col justify-center">

            {/* Top accent line */}
            <div className="h-0.5 w-12 rounded-full mb-6"
              style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD)" }} />

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Sign in</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-7">
              Don't have an account?{" "}
              <Link to="/signup"
                className="font-semibold transition-colors text-purple-600 dark:text-purple-400 hover:text-blue-500">
                Sign up free
              </Link>
            </p>

            <form onSubmit={handleLogin} className="space-y-5">

              {/* Username */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5
                                   text-gray-500 dark:text-gray-400">
                  Username
                </label>
                <input
                  type="text" name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  onFocus={() => setFocused("username")}
                  onBlur={() => setFocused("")}
                  className={inputCls("username")}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wide
                                     text-gray-500 dark:text-gray-400">
                    Password
                  </label>
                  <Link to="/forgot-password"
                    className="text-xs font-medium text-purple-500 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
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
                               text-gray-400 hover:text-purple-500 dark:hover:text-purple-400
                               transition-colors"
                  >
                    {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-bold text-white
                           transition-all duration-200
                           hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-300/30
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0
                           flex items-center justify-center gap-2 mt-2"
                style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD)" }}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="tracking-wide">Sign In</span>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              <span className="text-xs text-gray-400 dark:text-gray-500">secure login</span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            </div>

            {/* Bottom note */}
            <p className="text-[11px] text-center text-gray-400 dark:text-gray-500">
              🔒 Your session is encrypted and protected.
            </p>
          </div>
        </div>

        {/* Tagline below card */}
        <p className="text-center mt-5 text-xs text-gray-400 dark:text-gray-500">
          <span className="shimmer-text font-semibold">MindMate</span>
          {" "}· Share. Support. Heal. 💜
        </p>
      </motion.div>
    </div>
  );
};

export default Login;