import React from "react";
import PsychoTalkLogo from "/psychotalk_logo.webp";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <section className="bg-white bg1 text-white min-h-screen flex items-center justify-center pl-15 pr-15">
      <div className="container mx-auto flex flex-col md:flex-row items-center  mt-8">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold font-Roboto text-black">
            Welcome to PsychoTalk!
          </h1>
          <p className="text-gray-400 mt-15 text-xl font-Roboto">
            At PsychoTalk, you can share your thoughts and feelings safely, talk
            with people who understand, and get help from certified experts —
            all anonymously and without judgment.
          </p>

          <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between text-black mt-12 px-6 md:px-20">
            {/* ---- Text Section ---- */}
            <div className="text-2xl leading-relaxed">
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
              className="mt-8 md:mt-0 bg-gradient-to-r from-[#3C9BF9] to-[#9100BD] text-white text-lg font-bold px-8 py-3 rounded-full shadow-lg transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-end max-md:hidden">
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
