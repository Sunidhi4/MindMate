import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { easeInOut, motion } from "motion/react";

import Scroll from "../components/scroll";

import UserSignup from "./signup/UserSignup";
import ExpertSignup from "./signup/ExpertSignup";
import { Navigate } from "react-router-dom";
const SignUP = () => {

  const [signupType, setSignupType] = useState("user");

  const toggleFrom = () => {
    (signupType === "user") ? setSignupType("expert") : setSignupType("user");
  }
  return (
    <div className="min-h-screen  -mt-10 flex items-center justify-center p-10 bg-gradient text-black">
      <Scroll />
      <motion.div
        initial={{ opacity: 0.4, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: easeInOut,
        }}
      >
        <div className="flex justify-center md:bg-white/80 pt-4 p-6 rounded-4xl md:border-2 border-purple-600 shadow-4xl items-center animate-glow transition-all duration-500 hover:border-black">


          <div className=" w-full p-6 justify-center align-middle">
            {signupType === "user" ? (
              <p className="text-[10px] text-gray-400 mb-2">
                ⚠️ Use a <span className="font-semibold">display name</span> (not your real name).<br />
                Only your display name will be visible to others.<br />
                All other information is kept private and used for platform security only.
              </p>
            ) : (
              ""
            )}
            <div className="flex justify-between items-center pb md:pb-4 ">
              <h2 className="text-lg md:text-2xl font-bold ">Sign UP |
                {(signupType === "user") ? (<span className="text-[#9100BD] "> User</span>) : (<span className="text-[#9100BD]"> Expert</span>)}
              </h2>
              {(signupType === "user") ? (<p onClick={toggleFrom} className="text-blue-500 text-xs md:text-sm underline">Register as Expert?</p>) : (<p onClick={toggleFrom} className="text-blue-500 text-xs md:text-sm underline">Register as User?</p>)}
            </div>

            {(signupType === "user") ? <UserSignup /> : <ExpertSignup />}



          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default SignUP;
