import { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, Menu } from "lucide-react";
import NotificationDropdown from "../../expert/expertPages/navbarPages/NotificationDropdown";
import ProfileDropdown from "../../expert/expertPages/navbarPages/ProfileDropdown";
import { Link } from "react-router-dom";

export const ExpertNavbar = () => {
 const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

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
    <header className="flex justify-between items-center bg-white shadow px-6 py-3 border-b border-gray-200 sticky top-0 z-30">
      {/* Left - Hamburger */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden text-gray-700 hover:text-[#9100BD]"
        >
          <Menu size={26} />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800 kanit">Expert Panel</h1>
      </div>


{/* middle Action */}
<div className="flex items-center gap-7 text-gray-600 font-medium text-xl">
  <Link to="/expert/appointments" className="hover:text-[#9100BD]">
    Appointments
  </Link>
  <Link to="/expert/motivations " className="hover:text-[#9100BD]">
    Motivations
  </Link>
</div>

      {/* Right Actions */}
      <div className="flex items-center space-x-6">
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
              className={`text-gray-600 transition-transform ${
                showProfileMenu ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          {showProfileMenu && <ProfileDropdown />}
        </div>
      </div>
    </header>
  );
}
