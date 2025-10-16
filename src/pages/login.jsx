import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { easeInOut, motion } from "motion/react";
import Scroll from "../components/scroll";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Gloading, GsetLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/api/auth/login", formData);

      console.log("User logged in:", res.data);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token); // Store token
        localStorage.setItem("name", res.data.user.fullName);
        localStorage.setItem("email", res.data.user.email);
        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Scroll />
      <Navbar hideStartCoding={true} />

      <div className="flex items-center justify-center p-10 bg-white text-black">
        <motion.div
          initial={{ opacity: 0.4, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: easeInOut,
          }}
        >
          <div className="w-full max-w-3xl bg-white p-6 rounded-4xl border-2 border-gray-300 shadow-4xl flex flex-col md:flex-row items-center animate-glow transition-all duration-500 hover:border-black">
            <div className="flex flex-col items-center text-center md:w-1/2 p-6">
              {/* <img src={lockIcon} alt="Secure Login" className="w-50 mb-4" /> */}
              <h2 className="text-xl font-medium">
                Welcome back to{" "}
                <span className="font-gradient font-semibold">PsychoTalk</span>.
              </h2>
              <p className="text-gray-400 w-78">
                Code, collaborate, and conquer in real-time.
              </p>
            </div>

            {/* Right Side - Login Form */}
            <div className="md:w-1/2 w-full p-6">
              <h2 className="text-2xl font-bold mb-4">Login</h2>

              <form onSubmit={handleLogin}>
                <label className="block text-gray-400 text-sm mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className={`w-full p-2 rounded-full text-black ring-1 ring-[#3C9BF9] focus:outline-none focus:ring-1 focus:ring-[#9100BD]`}
                  required
                />

                <label className="block text-gray-400 text-sm mt-3 mb-1">
                  Password
                </label>
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    className={`w-full p-2 rounded-full text-black ring-1 ring-[#3C9BF9] focus:outline-none focus:ring-1 focus:ring-[#9100BD]`}
                    required
                  />

                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "show" : "hide"}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 mb-2 bg-gradient-to-r from-[#3C9BF9] to-[#9100BD] text-white py-2 rounded-full hover:from-[#9100BD] hover:to-[#3C9BF9] cursor-pointer font-bold flex items-center justify-center gap-2 relative"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 my-0.5 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Login"
                  )}
                </button>

                <p>
                  <Link to="/forgot-password" className="text-xs text-blue-500">
                    Forgot Password?
                  </Link>
                </p>
              </form>

              <div className="bg-gradient-to-r from-[#3C9BF9] to-[#9100BD] p-[1px] rounded-lg mt-3"></div>
              <p className="text-sm text-gray-400 mt-4">
                Don't have an account?{" "}
                <Link to="/signup" className="font-gradient font-medium">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
