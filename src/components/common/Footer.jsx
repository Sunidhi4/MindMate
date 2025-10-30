import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-white text-center pb-7">
      <div className="w-full bg-linear-to-r from-[#3C9BF9] to-[#9100BD] py-7 ">
        <div className="w-[60%] flex justify-around items-center flex-wrap text-center m-auto space-x-8">
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
      <p className="pt-8 text-gray-400">
        copyright © 2025 -{" "}
        <span className="font-bold font-gradient">PsychoTalk</span>
      </p>
      <p className="text-gray-500">All rights reserved.</p>
    </footer>
  );
};

export default Footer;
