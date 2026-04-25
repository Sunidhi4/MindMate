import { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, Menu } from "lucide-react";
//import NotificationDropdown from "../../expert/expertPages/navbarPages/NotificationDropdown";
//import ProfileDropdown from "../../expert/expertPages/navbarPages/ProfileDropdown";
import ProfileDropdown from "../../protected/components/ProfileDropdown";
import { Link, NavLink } from "react-router-dom";

export const ExpertNavbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const [darkMode, setDarkMode]                 = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      )
        setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(event.target))
        setShowProfileMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

   const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <header className="flex justify-between items-center bg-white dark:bg-[#0b1224] shadow px-6 py-3 border-b border-gray-200 sticky top-0 z-30">
      {/* Left - Hamburger */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden text-gray-700 hover:text-[#9100BD]"
        >
          <Menu size={26} />
        </button>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Work Space</h1>
      </div>


      {/* middle Action */}
      <div className="flex items-center gap-7 text-gray-600 dark:text-white font-semibold text-xl">
        <NavLink to="/expert/appointments"
          className={({ isActive }) => `hover:text-[#9100BD] ${(isActive) ? "border-b-2 border-[#9100BD] text-[#9100BD]" : ""}`}
        >
          Appointments
        </NavLink>
        <NavLink to="/expert/support"
          className={({ isActive }) => `hover:text-[#9100BD] ${(isActive) ? "border-b-2 border-[#9100BD] text-[#9100BD]" : ""}`}
        >
          Support
        </NavLink>
        <NavLink to="/expert/motivations"
          className={({ isActive }) => `hover:text-[#9100BD] ${(isActive) ? "border-b-2 border-[#9100BD] text-[#9100BD]" : ""}`}
        >
          Motivations
        </NavLink>
      </div>

       

      {/* Right Actions */}
      <div className="flex items-center space-x-6">

{/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400
                         hover:bg-purple-50 dark:hover:bg-gray-800
                         hover:text-purple-600 dark:hover:text-yellow-400
                         transition-colors"
              title={darkMode ? "Switch to light" : "Switch to dark"}
            >
              {darkMode ? (
                /* Sun icon */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1"  x2="12" y2="3"  />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"  />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3"  y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22" />
                </svg>
              ) : (
                /* Moon icon */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

        {/* 🔔 Notification */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative focus:outline-none"
          >
            <Bell size={24} className="text-gray-700 hover:text-[#9100BD]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-pink-500 rounded-full"></span>
          </button>
          {showNotifications && <NotificationDropdown />}
        </div>

        {/* 👤 Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <img
              src="https://i.pravatar.cc/40"
              alt="User Avatar"
              className="w-9 h-9 rounded-full border border-gray-300"
            />
            <ChevronDown
              size={18}
              className={`text-gray-600 transition-transform ${showProfileMenu ? "rotate-180" : "rotate-0"
                }`}
            />
          </button>
          {showProfileMenu && <ProfileDropdown />}
        </div>
      </div>
    </header>
  );
}
