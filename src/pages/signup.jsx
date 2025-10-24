import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";;
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { easeInOut, motion } from "motion/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Scroll from "../components/scroll";
import { toast } from "react-toastify";
import axios from "axios";
import UserSignup from "./signup/UserSignup";
import ExpertSignup from "./signup/ExpertSignup";
const SignUP = () => {
  
  const [signupType , setSignupType] = useState("user");

 const toggleFrom = ()=>{
    (signupType === "user") ? setSignupType("expert") : setSignupType("user");
  }
  return (
      <div className="flex items-center justify-center p-10 bg-white text-black">
        <motion.div
          initial={{ opacity: 0.4, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: easeInOut,
          }}
        >
<div className="flex justify-center bg-white p-6 rounded-4xl border-2 border-gray-300 shadow-4xl items-center animate-glow transition-all duration-500 hover:border-black">
            

            <div className=" w-full p-6 justify-center align-middle">
              <div className="flex justify-between align-middle">
                <h2 className="text-2xl font-bold mb-4">Sign UP |
                   {(signupType === "user") ? (<span className="text-[#9100BD] text-2xl"> User</span>): (<span className="text-[#9100BD] text-2xl"> Expert</span>)}
        </h2>
                {(signupType === "user") ? (<p onClick={toggleFrom} className="text-blue-500 underline">Register as Expert?</p>):(<p onClick={toggleFrom} className="text-blue-500 underline">Register as User?</p>)}
              </div>
              
          {(signupType === "user") ? <UserSignup/> : <ExpertSignup/> }
              

              
            </div>
          </div>
          
        </motion.div>
      </div>
  );
};

export default SignUP;
