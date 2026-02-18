import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-white text-center  pb-3 ">
      <div className="w-full bg-linear-to-r from-[#3C9BF9] to-[#9100BD] py-7 ">
        <div className="w-full px-2 lg:px-10 flex justify-evenly items-center flex-wrap text-center m-auto space-x-8 text-xs lg:text-lg">
          <Link to="/faq" className="text-white hover:underline">
            FAQ’s
          </Link>
          <Link to="/about" className="text-white hover:underline">
            About Us
          </Link>
          <Link to="/contact" className="text-white hover:underline">
            Contact Us
          </Link>
          <Link to="/" className="text-white hover:underline">
            Company
          </Link>
        </div>
      </div>
      <p className="pt-2  text-gray-400 lg:text-base text-xs">
        copyright © 2025 -{" "}
        <span className="font-bold font-gradient">PsychoTalk</span>
      </p>
      <p className="text-gray-500 text-xs">All rights reserved.</p>
    </footer>
  );
};

export default Footer;
