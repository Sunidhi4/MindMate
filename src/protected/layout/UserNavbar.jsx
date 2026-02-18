import { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, Menu } from "lucide-react";
import NotificationDropdown from "../components/NotificationDropdown"
import ProfileDropdown from "../components/ProfileDropdown";
import { Link, NavLink } from "react-router-dom";

export const UserNavbar = () => {
  const navItems = [
  { name: "Share", path: "/user/share"},
  { name: "Support", path: "/user/support" },
  { name: "Experts", path: "/user/experts"},
  { name: "motivations", path: "/user/motivations" },
];

  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme") || "light";
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

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

  return (
    <header className="flex justify-between items-center navbar-bg-gradient dark:bg-black shadow px-6 py-3 border-b border-gray-200 sticky top-0 z-30 ">
      {/* Left - Hamburger */}
      <div className="flex items-center gap-4 ">

        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden text-gray-700 hover:text-[#9100BD]"
        >
          <Menu size={26} />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800 kanit">User Panel</h1>
      </div>


      {/* middle Action */}
      <nav className="flex items-center gap-7 text-gray-600 font-medium text-xl ">
        {navItems.map(({name , path})=>(
          <NavLink
            key={path}
            to={path}
            className={({isActive})=>
              `hover:text-[#9100BD] 
            ${isActive ? "text-[#ae10b3] border-b-2 border-blue-500 duration-300 " : ""}`}
          >
            {name}
          </NavLink>
        ))}
      </nav>

      {/* Right Actions */}
      <div className="flex items-center space-x-6">


        {/* theme button */}
        <button onClick={toggleTheme}>
          {darkMode ? (<svg width="20" height="20" viewBox="0 0 30 30">
            <circle cx="15" cy="15" r="7" fill="currentColor" />
            <line
              id="ray"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              x1="10"
              y1="1"
              x2="10"
              y2="4"
            ></line>
            <use href="#ray" transform="rotate(45 15 15)" />
            <use href="#ray" transform="rotate(90 15 15)" />
            <use href="#ray" transform="rotate(135 15 15)" />
            <use href="#ray" transform="rotate(180 15 15)" />
            <use href="#ray" transform="rotate(225 15 15)" />
            <use href="#ray" transform="rotate(270 15 15)" />
            <use href="#ray" transform="rotate(315 15 15)" />
          </svg>) : (
            <svg width="20" height="20" viewBox="0 0 30 30">
              <path
                fill="currentColor"
                d="
      M 23, 5
      A 12 12 0 1 0 23, 25
      A 12 12 0 0 1 23, 5"
              />
            </svg>)}
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
              src={"https://i.pravatar.cc/80?u=" + sessionStorage.getItem("name")}
              alt="User Avatar"
                className="w-9 h-9 rounded-full border-2 border-purple-500 ring-2 ring-purple-300 ring-offset-2 transition-all group-hover:ring-purple-500"

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
};


