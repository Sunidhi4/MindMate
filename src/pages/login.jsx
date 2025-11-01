import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";
import { easeInOut, motion } from "motion/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Scroll from "../components/scroll";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginType , setLoginType] = useState("User");
  
  const toggleLoginType  = (e)=>{
    (loginType === "User") ? setLoginType("Expert") : setLoginType("User");
  }

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
      if(loginType === "User"){
        const res = await axios.post("http://localhost:8080/User/login", formData);
        if (res.data.token) {
        sessionStorage.setItem("token", res.data.token); // Store token
        sessionStorage.setItem("id" ,res.data.user.id);
        sessionStorage.setItem("name" ,res.data.user.username);
        sessionStorage.setItem("email" ,res.data.user.email);
        sessionStorage.setItem("age" ,res.data.user.age);
        sessionStorage.setItem("phone" ,res.data.user.phone);
        sessionStorage.setItem("gender" ,res.data.user.gender);
        sessionStorage.setItem("answersCount" , res.data.user.answersCount);
        sessionStorage.setItem("questionsCount" , res.data.user.questionsCount);
        toast.success("Login successful!");
        navigate("/user/dashboard");
        }else{
          toast.error(res.data.errorMsg);
        }
      }else{
        const res = await axios.post("http://localhost:8080/Expert/login", formData);
        if (res.data.token) {
        sessionStorage.setItem("token", res.data.token); // Store token
        sessionStorage.setItem("id" ,res.data.expert.id);
        sessionStorage.setItem("name" ,res.data.expert.fullName);
        sessionStorage.setItem("email" ,res.data.expert.email);
        sessionStorage.setItem("age" ,res.data.expert.age);
        sessionStorage.setItem("gender" ,res.data.expert.gender);
        toast.success("Login successful!");
        navigate("/expert/dashboard");
        }else{
          toast.error(res.data.errorMsg);
        }
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient text-black">
        <motion.div
          initial={{ opacity: 0.4, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: easeInOut,
          }}
        >
          <div className="w-full sm:max-w-3xl -mt-40 sm:-mt-20 p-6 rounded-4xl sm:border-2 sm:border-purple-700 sm:hover:border-blue-700 sm:shadow-4xl flex flex-col md:flex-row items-center animate-glow transition-all duration-500 sm:bg-[#f0eded44]">
            <div className="flex flex-col items-center text-center md:w-1/2 p-3 sm:p-6">
              {/* <img src={lockIcon} alt="Secure Login" className="w-50 mb-4" /> */}
              <h2 className="text-lg sm:text-xl font-medium">
                Welcome back to{" "}
                <span className="font-gradient font-semibold">PsychoTalk</span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 w-78">
                Share, Support, live a Stree free life.
              </p>
              {loginType === "User"
               ?
               <p onClick={toggleLoginType} className="text-blue-500 underline mt-1 text-xs cursor-pointer hover:text-blue-700">Login as Expert?</p>
              :
              <p onClick={toggleLoginType} className=" text-blue-500 underline mt-1 text-xs cursor-pointer hover:text-blue-700">Login as User?</p>
        
              }
                   </div>

            {/* Right Side - Login Form */}
            <div className="md:w-1/2 sm:w-full sm:p-6 px-3">
              <h2 className="text-lg sm:text-2xl font-bold mb-4">Login | <span className="text-[#9100BD]">{loginType}</span></h2>

              <form onSubmit={handleLogin}>
                <label className="block text-gray-400 text-sm mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className={`w-full py-2 px-4 text-sm sm:text-base rounded-full ring-1 ring-[#3C9BF9] focus:outline-none focus:ring-1 focus:ring-[#9100BD]`}
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
                    className={`w-full py-2 px-4 text-sm sm:text-base rounded-full text-black ring-1 ring-[#3C9BF9] focus:outline-none focus:ring-1 focus:ring-[#9100BD]`}
                    required
                  />

                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 mb-2 bg-linear-to-r from-[#3C9BF9] to-[#9100BD] text-white py-2 rounded-full hover:from-[#9100BD] hover:to-[#3C9BF9] cursor-pointer font-bold flex items-center justify-center gap-2 relative"
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

              <div className="bg-linear-to-r from-[#3C9BF9] to-[#9100BD] p-px rounded-lg mt-3"></div>
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
  );
};

export default Login;
