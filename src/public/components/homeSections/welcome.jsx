import React from "react";
import PsychoTalkLogo from "/psychotalk_logo.webp";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <section className="bg-gradient text-white min-h-screen flex items-center justify-center -mt-6">
      <div className="container  flex flex-col md:flex-row items-center ">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-bold font-Roboto text-black">
            Welcome to PsychoTalk!
          </h1>
          <p className="text-gray-700 lg:mt-10 lg:text-lg text-xs px-12 py-4 md:p-0 font-Roboto">
            At PsychoTalk, you can share your thoughts and feelings safely, talk
            with people who understand, and get help from certified experts —
            all anonymously and without judgment.
          </p>

          <div className="w-full flex flex-col lg:flex-row items-center lg:items-start  justify-between text-black mt-12 px-6 md:px-20">
            {/* ---- Text Section ---- */}
            <div className="text-xs lg:text-2xl leading-relaxed">
              <p className="font-['Roboto'] font-medium font-gradient">
                Safe and supportive space,
              </p>
              <p className="font-['Roboto'] font-medium font-gradient">
                Anonymous sharing,
              </p>
              <p className="font-['Roboto'] font-medium font-gradient">
                Judgment-free environment.
              </p>
            </div>

            {/* ---- Button Section ---- */}
            <Link
              to="/signup"
              className=" mt-8 w-auto bg-linear-to-r from-[#3C9BF9] to-[#9100BD] text-white text-xs lg:text-lg  font-bold px-3 py-2 md:px-6 md:py-3 rounded-full shadow-lg transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-end max-md:hidden">
          <img
            src={PsychoTalkLogo}
            alt="Laptop with Code"
            className="w-[70%] md:w-[80%] opacity-70 select-none pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
};

export default Welcome;
