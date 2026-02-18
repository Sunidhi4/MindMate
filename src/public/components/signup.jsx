import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { easeInOut, motion } from "motion/react";


const SignUP = () => {
  const [signupType, setSignupType] = useState("user");

  const toggleSignUpType = () => {
    (signupType === "user") ? setSignupType("expert") : setSignupType("user");
  }
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const usernameRegex = /^[a-zA-Z0-9_@#]{8,}/;
  const validatePassword = (password) => passwordRegex.test(password);
  const validateUsername = (username) => usernameRegex.test(username);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateUsername(formData.username)) {
      toast.error("username should have alphabet , number , _ # @ only")
      return;
    }
    if (!validatePassword(formData.password)) {
      toast.error(
        "Password must be at least 8 characters, with one uppercase, one number, and one special character!"
      );
      return;
    }
    setLoading(true);
    try {
      
      const res = await axios.post(`http://localhost:8080/public/register/${signupType}`, formData);

      if (res.status === 200) {
        toast.success("User registered successfully! Please login.");
        navigate("/login");
      } else {
        toast.error("Username already exist choose different one.");
      }

    } catch (error) {
      console.error("Registration failed:", error.response?.data || error);
      toast.error(error.response?.data.message || error);
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
                   Welcome to{" "}
                   <span className="font-gradient font-semibold">PsychoTalk</span>
                 </h2>
                 <p className="text-xs sm:text-sm text-gray-400 w-78">
                   Share, Support, live a Stree free life.
                 </p>
                 

                 <div className=" w-full mt-2 justify-center align-middle">
            {signupType === "user" ? (
              <p className="text-[10px] text-red-500 ">
                ⚠️ Use a <span className="font-semibold">display name</span> (not your real name).<br />
                Only your display name will be visible to others.<br />
                All other information is kept private 
                <br/>and used for platform security only.
              </p>
            ) : (
              ""
            )}
            </div>

            {signupType === "user"
                  ?
                  <p onClick={toggleSignUpType} className="text-blue-500 underline mt-3 text-xs cursor-pointer hover:text-blue-700">Register as Expert?</p>
                 :
                 <p onClick={toggleSignUpType} className=" text-blue-500 underline mt-3 text-xs cursor-pointer hover:text-blue-700">Register as User?</p>
           
                 }
            
            </div>
   
               {/* Right Side - Login Form */}
               <div className="md:w-1/2 sm:w-full sm:p-6 px-3">
                 <h2 className="text-lg sm:text-2xl font-bold mb-4">Sign Up | <span className="text-[#9100BD]">{signupType}</span></h2>
   
                 {/** form */}
                      <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="flex justify-center flex-col md:flex-row md:gap-8  ">
                <div>
                    <label className="block text-gray-400 text-sm mt-3 mb-1">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        className={`w-3xs p-2 rounded-full text-black ring-1 ring-[#3C9BF9] focus:outline-none focus:ring-1 focus:ring-[#9100BD] placeholder:text-gray-400 placeholder:pl-1`}
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
                            required
                            className={`w-3xs p-2 rounded-full text-black ring-1 ring-[#3C9BF9] focus:outline-none focus:ring-1 focus:ring-[#9100BD]`}

                        />

                        <button
                            type="button"
                            className="absolute right-3 top-2 text-gray-400 hover:text-gray-600 transition cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "show" : "hide"}
                        </button>
                    </div>

                    <div className="flex flex-col items-center w-3xs mt-5">
                        <button
                            type="submit"
                            className="w-full mt-6 mb-3 bg-linear-to-r from-[#3C9BF9] to-[#9100BD] text-white py-2 rounded-full hover:from-[#9100BD] hover:to-[#3C9BF9] cursor-pointer font-bold flex items-center justify-center gap-2 relative"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 my-0.5 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                "Sign Up"
                            )}
                        </button>
                        <div className="w-full bg-linear-to-r from-[#3C9BF9] to-[#9100BD] p-1px rounded-lg mt-3"></div>
                        <p className="text-sm text-gray-400 mt-3">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-gradient font-medium"
                            >
                                Login
                            </Link>
                        </p>

                    </div>
                </div>
                
            </div>

        </form>
   
              
               </div>
             </div>
           </motion.div>
         </div>
  );
};

export default SignUP;

 