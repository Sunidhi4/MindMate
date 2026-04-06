import { useState, useEffect } from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import PsychoTalkLogo from "../assets/psychotalk_logo.webp";

const navItems = [
  { name: "Home",     path: "/"        },
  { name: "About", path: "/about"   },
  { name: "Contact",  path: "/contact" },
  { name: "Experts",  path: "/experts" },
];

const Navbar = () => {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location                = useLocation();

  const isLoginPage  = location.pathname === "/login";
  const isSignUpPage = location.pathname === "/signup";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("theme") || "light";
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <>
      <style>{`
        .nav-link-active::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0; right: 0;
          height: 2.5px; border-radius: 99px;
          background: linear-gradient(90deg, #3C9BF9, #9100BD);
        }
      `}</style>

      <header className={`sticky top-0 z-50 w-full transition-all duration-300
        ${scrolled
          ? "bg-white/85 dark:bg-gray-900/85 backdrop-blur-lg shadow-md border-b border-purple-100 dark:border-gray-700"
          : "bg-white dark:bg-gray-900 border-b border-purple-100 dark:border-gray-800"
        }`}>

        {/* Gradient accent line */}
        <div className="h-1 w-full"
          style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD,#ec4899)" }} />

        {/* ── Main bar ── */}
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#3C9BF9,#9100BD)" }}>
              <img src={PsychoTalkLogo} alt="Logo"
                className="w-8 h-8 object-contain pointer-events-none" />
            </div>
            <span className="hidden sm:block text-2xl font-bold text-gray-800 dark:text-white tracking-tight">
              PsychoTalk
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(({ name, path }) => (
              <NavLink key={path} to={path}
                className={({ isActive }) =>
                  `relative px-4 py-2.5 text-lg font-semibold rounded-xl transition-all duration-150
                   ${isActive
                    ? "text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 nav-link-active"
                    : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-800"
                  }`
                }
              >
                {name}
              </NavLink>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3 shrink-0">

            {/* Theme toggle */}
            <button onClick={toggleTheme}
              title={darkMode ? "Switch to light" : "Switch to dark"}
              className="p-2.5 rounded-xl transition-colors
                         text-gray-500 dark:text-gray-400
                         hover:bg-purple-50 dark:hover:bg-gray-800
                         hover:text-purple-600 dark:hover:text-yellow-400">
              {darkMode ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1"  x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1"  y1="12" x2="3"  y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* Auth — desktop */}
            <div className="hidden lg:flex items-center gap-3">
              {isLoginPage ? (
                <Link to="/signup"
                  className="px-6 py-2.5 text-base font-semibold text-white rounded-xl
                             shadow-sm hover:opacity-90 hover:-translate-y-0.5 transition-all"
                  style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD)" }}>
                  Sign Up
                </Link>
              ) : isSignUpPage ? (
                <Link to="/login"
                  className="px-6 py-2.5 text-base font-semibold rounded-xl transition-all
                             text-purple-700 dark:text-purple-300
                             border-2 border-purple-400 dark:border-purple-600
                             hover:bg-purple-50 dark:hover:bg-purple-900/30">
                  Login
                </Link>
              ) : (
                <>
                  <Link to="/login"
                    className="px-6 py-2.5 text-base font-semibold rounded-xl transition-all
                               text-purple-700 dark:text-purple-300
                               border-2 border-purple-400 dark:border-purple-600
                               hover:bg-purple-50 dark:hover:bg-purple-900/30">
                    Login
                  </Link>
                  <Link to="/signup"
                    className="px-6 py-2.5 text-base font-semibold text-white rounded-xl
                               shadow-sm hover:opacity-90 hover:-translate-y-0.5 transition-all"
                    style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD)" }}>
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Hamburger — mobile */}
            <button onClick={() => setOpen(p => !p)}
              className="lg:hidden p-2.5 rounded-xl transition-colors
                         text-gray-700 dark:text-gray-300
                         hover:bg-purple-50 dark:hover:bg-gray-800">
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown ── */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300
                         bg-white dark:bg-gray-900
                         border-t border-purple-100 dark:border-gray-700
                         ${open ? "max-h-[420px] py-4" : "max-h-0"}`}>
          <nav className="flex flex-col gap-1 px-5">
            {navItems.map(({ name, path }) => (
              <NavLink key={path} to={path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-base font-semibold transition-colors
                   ${isActive
                    ? "text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30"
                    : "text-gray-700 dark:text-gray-300 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-gray-800"
                  }`
                }
              >
                {name}
              </NavLink>
            ))}

            {/* Auth — mobile */}
            <div className="flex gap-3 pt-4 mt-2 border-t border-gray-100 dark:border-gray-700">
              <Link to="/login" onClick={() => setOpen(false)}
                className="flex-1 py-3 text-center text-base font-semibold rounded-xl transition-all
                           text-purple-700 dark:text-purple-300
                           border-2 border-purple-400 dark:border-purple-600
                           hover:bg-purple-50 dark:hover:bg-purple-900/30">
                Login
              </Link>
              <Link to="/signup" onClick={() => setOpen(false)}
                className="flex-1 py-3 text-center text-base font-semibold text-white rounded-xl
                           transition-all hover:opacity-90"
                style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD)" }}>
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;