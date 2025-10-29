import { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, Menu } from "lucide-react";
import NotificationDropdown from "../../user/userPages/navbarPages/NotificationDropdown"
import ProfileDropdown from "../../user/userPages/navbarPages/ProfileDropdown";

import { Link } from "react-router-dom";
export const UserNavbar = ({ setSidebarOpen }) => {
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
    <header className="flex justify-between items-center bg-linear-to-r from-[#e4f8fc] via-[#f6f3f3] to-[#def8f9] dark:bg-black shadow px-6 py-3 border-b border-gray-200 sticky top-0 z-30 ">
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
      <div className="flex items-center gap-7 text-gray-600 font-medium text-xl ">
        <Link to="/user/share" className="hover:text-[#9100BD]" >
          Share
        </Link>
        <Link to="/user/support" className="hover:text-[#9100BD]">
          Support
        </Link>
        <Link to="/user/experts" className="hover:text-[#9100BD]">
          Experts
        </Link>
        <Link to="/user/routine" className="hover:text-[#9100BD]">
          Routine
        </Link>
      </div>

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
};



// import { useEffect, useRef, useState } from "react";
// import { Bell, ChevronDown } from "lucide-react";
// import NotificationDropdown from "../../userNavPages/NotificationDropdown";
// import ProfileDropdown from "../../userNavPages/ProfileDropdown";

// export const UserNavbar = ({ title }) => {
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);

//   const notificationRef = useRef(null);
//   const profileRef = useRef(null);

//   // 🧠 Detect click outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         notificationRef.current &&
//         !notificationRef.current.contains(event.target)
//       ) {
//         setShowNotifications(false);
//       }
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setShowProfileMenu(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <header className="flex justify-between items-center bg-white shadow-sm px-8 py-3 border-b border-gray-200 relative z-50">
//       {/* Left Title */}
//       <h1 className="text-2xl font-semibold text-gray-800 kanit">{title}</h1>

//       {/* Right Actions */}
//       <div className="flex items-center space-x-6">
//         {/* 🔔 Notification */}
//         <div className="relative" ref={notificationRef}>
//           <button
//             onClick={() => {
//               setShowNotifications(!showNotifications);
//               setShowProfileMenu(false);
//             }}
//             className="relative focus:outline-none"
//           >
//             <Bell size={24} className="text-gray-700 hover:text-[#9100BD]" />
//             <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-pink-500 rounded-full"></span>
//           </button>

//           {showNotifications && (
//             <NotificationDropdown />
//           )}
//         </div>

//         {/* 👤 Profile */}
//         <div className="relative" ref={profileRef}>
//           <button
//             onClick={() => {
//               setShowProfileMenu(!showProfileMenu);
//               setShowNotifications(false);
//             }}
//             className="flex items-center space-x-2 focus:outline-none"
//           >
//             <img
//               src="https://i.pravatar.cc/40"
//               alt="User Avatar"
//               className="w-9 h-9 rounded-full border border-gray-300"
//             />
//             <ChevronDown
//               size={18}
//               className={`text-gray-600 transition-transform ${
//                 showProfileMenu ? "rotate-180" : "rotate-0"
//               }`}
//             />
//           </button>

//           {showProfileMenu && (
//             <ProfileDropdown />
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };



// import { useState } from "react";
// import { Bell, ChevronDown } from "lucide-react";
// import NotificationDropdown from "../../userNavPages/NotificationDropdown";
// import ProfileDropdown from "../../userNavPages/ProfileDropdown";

// export const UserNavbar = ({ title }) => {
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);

//   return (
//     <header className="flex justify-between items-center bg-white shadow-sm px-8 py-3 border-b border-gray-200">
//       {/* Page Title */}
//       <h1 className="text-2xl font-semibold text-gray-800 kanit">
//         {title}
//       </h1>

//       {/* Right Actions */}
//       <div className="flex items-center space-x-6 relative">
//         {/* 🔔 Notification */}
//         <div className="relative">
//           <button
//             onClick={() => {
//               setShowNotifications(!showNotifications);
//               setShowProfileMenu(false);
//             }}
//             className="relative focus:outline-none"
//           >
//             <Bell size={24} className="text-gray-700 hover:text-[#9100BD]" />
//             <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-pink-500 rounded-full"></span>
//           </button>

//           {showNotifications && (
//             <NotificationDropdown
//               onClose={() => setShowNotifications(false)}
//             />
//           )}
//         </div>

//         {/* 👤 Profile */}
//         <div className="relative">
//           <button
//             onClick={() => {
//               setShowProfileMenu(!showProfileMenu);
//               setShowNotifications(false);
//             }}
//             className="flex items-center space-x-2 focus:outline-none"
//           >
//             <img
//               src="https://i.pravatar.cc/40"
//               alt="User Avatar"
//               className="w-9 h-9 rounded-full border border-gray-300"
//             />
//             <ChevronDown
//               size={18}
//               className={`text-gray-600 transition-transform ${
//                 showProfileMenu ? "rotate-180" : "rotate-0"
//               }`}
//             />
//           </button>

//           {showProfileMenu && (
//             <ProfileDropdown onClose={() => setShowProfileMenu(false)} />
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };



// import { Bell, SunMedium, UserCircle2 } from "lucide-react";

// export const UserNavbar = ({ title }) => {
//   return (
//     <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm sticky top-0 z-30">
//       <h1 className="text-2xl font-semibold kanit text-[#0C4663]">
//         {title || "Dashboard"}
//       </h1>

//       <nav className="flex items-center space-x-6">
//         <button className="text-gray-500 hover:text-[#3C9BF9] transition">
//           <Bell size={22} />
//         </button>
//         <button className="text-gray-500 hover:text-[#3C9BF9] transition">
//           <SunMedium size={22} />
//         </button>
//         <button className="text-gray-500 hover:text-[#3C9BF9] transition">
//           <UserCircle2 size={28} />
//         </button>
//       </nav>
//     </header>
//   );
// };


// import { Link } from "react-router-dom";
// import { Share2, LifeBuoy, Users2, CalendarDays, LogOut } from "lucide-react";

// export const UserNavbar = ({ title }) => {
//   return (
//     <header className="bg-white flex justify-between items-center px-8 py-5 border-b border-gray-400">
//       {/* Page Title */}
//       <h1 className="text-2xl font-['Kanit'] text-gray-800 flex items-center gap-2">
//         {title}
//       </h1>

//       {/* Right Side Navigation */}
//       <nav className="flex items-center gap-6 text-gray-500">
//         <Link to="/user/share" className="flex items-center gap-1 hover:text-black">
//           <Share2 size={20} /> Share
//         </Link>
//         <Link to="/user/support" className="flex items-center gap-1 hover:text-black">
//           <LifeBuoy size={20} /> Support
//         </Link>
//         <Link to="/user/experts" className="flex items-center gap-1 hover:text-black">
//           <Users2 size={20} /> Experts
//         </Link>
//         <Link to="/user/routine" className="flex items-center gap-1 hover:text-black">
//           <CalendarDays size={20} /> Routine
//         </Link>
//         <Link to="/" className="flex items-center gap-1 text-red-500 hover:text-red-800">
//           <LogOut size={20} /> Logout
//         </Link>
//       </nav>
//     </header>
//   );
// };

