import { useState, useEffect } from "react";
import { Link, useLocation , NavLink} from "react-router-dom";
import PsychoTalkLogo from "/psychotalk_logo.webp";

const Navbar = () => {

    const navItems = [
        {name : "Home" , path : "/"},
        {name : "About Us" , path : "/about"},
        {name : "Contact" , path : "/contact"},
        {name : "Experts" , path : "/experts"},

    ]

  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  const isSignUpPage = location.pathname === "/signup";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 nav-bg border-b-2 border-gray-500 ${
        isScrolled
          ? "bg-white/30 backdrop-blur-lg shadow-sm  "
          : " shadow-none"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 ">

        {/* === Left: Logo === */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={PsychoTalkLogo}
            alt="PsychoTalk Logo"
            className="w-12 h-12"
          />
          <span className="hidden md:inline-block text-2xl font-bold font-gradient">
            PsychoTalk
          </span>
        </Link>

        {/* === Center: Nav Links (Desktop) === */}
        <nav className="hidden lg:flex items-center space-x-10  lg:gap-2 font-medium text-xl text-gray-800 ">

            {navItems.map(({name , path})=>(
                <NavLink
                    key={path}
                    to={path}
                    className={({isActive})=>
                        ` hover:text-[#9100BD]  transition duration-100 ease-linear
                        ${isActive ? "text-[#9100BD] border-b-2 border-black" : ""}`
                    }
                >
                    {name}
                </NavLink>
            ))}
            
          
        </nav>

        {/* === Right: Auth Buttons (Desktop) === */}
        <div className="hidden lg:flex items-center space-x-4">
          {isLoginPage ? (
            <Link
              to="/signup"
              className="px-6 py-2 text-white text-lg font-semibold rounded-full bg-linear-to-r from-[#3C9BF9] to-[#9100BD] hover:from-[#9100BD] hover:to-[#3C9BF9] transition"
            >
              Sign Up
            </Link>
          ) : isSignUpPage ? (
            <Link
              to="/login"
              className="px-6 py-2 text-black text-lg font-semibold rounded-full bg-white border-2 border-[#9100BD] hover:bg-[#9100BD] hover:text-white transition"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-6 py-2 text-black text-lg font-semibold rounded-full bg-white border-2 border-[#9100BD] hover:bg-[#9100BD] hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2 text-white text-lg font-semibold rounded-full bg-linear-to-r from-[#3C9BF9] to-[#9100BD] hover:from-[#9100BD] hover:to-[#3C9BF9] transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* === Mobile Menu Button === */}
        <button
          className="lg:hidden flex flex-col space-y-1 focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          <span
            className={`h-0.5 w-6 bg-black transition-transform ${
              open ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`h-0.5 w-6 bg-black ${
              open ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`h-0.5 w-6 bg-black transition-transform ${
              open ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* === Mobile Dropdown Menu === */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden absolute z-20 right-0  nav-bg px-5 rounded-b-2xl  ${
          open ? "max-h-80 py-4" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col items-center space-y-4 text-base">
          <Link
            to="/"
            className=" text-gray-800 hover:text-[#9100BD]"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className=" text-gray-800 hover:text-[#9100BD]"
            onClick={() => setOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className=" text-gray-800 hover:text-[#9100BD]"
            onClick={() => setOpen(false)}
          >
            Contact Us
          </Link>
          <Link
            to="/experts"
            className=" text-gray-800 hover:text-[#9100BD]"
            onClick={() => setOpen(false)}
          >
            Experts
          </Link>
          

          {/* Auth Buttons in Mobile */}
          <div className="flex flex-col space-y-2 pt-2">
            <Link
              to="/login"
              className="px-3 py-1 text-center text-black text-sm font-semibold rounded-full bg-white border-2 border-[#9100BD] hover:bg-[#9100BD] hover:text-white transition"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-3 py-1 text-center text-white text-sm font-semibold rounded-full bg-linear-to-r from-[#3C9BF9] to-[#9100BD] hover:from-[#9100BD] hover:to-[#3C9BF9] transition"
              onClick={() => setOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
