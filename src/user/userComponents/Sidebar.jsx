import { NavLink } from "react-router-dom";
import PsychoTalkLogoTrans from "../../assets/psychotalk_logo_trans.webp";
import { LiaAddressCardSolid } from "react-icons/lia";

import {
  LayoutDashboard,
  UserRound,
  Settings,
  Bell,
  HelpCircle,
  X,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/user/dashboard", icon: LayoutDashboard },
  { name: "Your Appointments", path: "/user/appointments", icon: LiaAddressCardSolid },
  { name: "Profile", path: "/user/profile", icon: UserRound },
  { name: "Settings", path: "/user/settings", icon: Settings },
  { name: "Notifications", path: "/user/notifications", icon: Bell },
  { name: "Help", path: "/user/help", icon: HelpCircle },
];

const  Sidebar = ({ open, setOpen }) => {
  return (
    <div className="">
      {/* Overlay for mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
        ></div>
      )}

      <aside
        className={`fixed z-40 top-0 left-0 h-full w-72 bg-white shadow-md border-r border-gray-200 flex flex-col transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >

        <div className="h-full bg-linear-to-b from-[#e6f6f9] via-[#f6f3f3] to-[#e5f9fa]">
          {/* Header */}
          <div className="flex justify-between items-center p-5 border-b border-gray-200 ">
            <div className="flex items-center gap-3"> 
              <img
                src={PsychoTalkLogoTrans}
                alt="logo"
                className="w-12 h-12 pointer-events-none"
              />
              <h1 className="text-2xl kanit font-gradient">PsychoTalk</h1>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="lg:hidden p-1 rounded-full hover:bg-gray-200"
            >
              <X size={22} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-3 p-4">
            {navItems.map(({ name, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-5 py-2 rounded-full transition-all text-lg font-medium ${isActive
                    ? "bg-linear-to-r from-[#3C9BF9] to-[#9100BD] text-white"
                    : "text-gray-500 hover:bg-gray-100"
                  }`
                }
              >
                <Icon size={22} />
                {name}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;



