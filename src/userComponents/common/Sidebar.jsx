import { NavLink } from "react-router-dom";
import PsychoTalkLogoTrans from "../../assets/psychotalk_logo_trans.webp";
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
  { name: "Profile", path: "/user/profile", icon: UserRound },
  { name: "Settings", path: "/user/settings", icon: Settings },
  { name: "Notifications", path: "/user/notifications", icon: Bell },
  { name: "Help", path: "/user/help", icon: HelpCircle },
];

const Sidebar = ({ open, setOpen }) => {
  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
        ></div>
      )}

      <aside
        className={`fixed z-40 top-0 left-0 h-full w-72 bg-white shadow-md border-r border-gray-200 flex flex-col transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
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
                `flex items-center gap-3 px-5 py-2 rounded-full transition-all text-lg font-medium ${
                  isActive
                    ? "bg-gradient-to-r from-[#3C9BF9] to-[#9100BD] text-white"
                    : "text-gray-500 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={22} />
              {name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;



// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import PsychoTalkLogoTrans from "../../assets/psychotalk_logo_trans.webp";
// import {
//   LayoutDashboard,
//   UserRound,
//   Settings,
//   Bell,
//   HelpCircle,
//   Menu,
//   X,
// } from "lucide-react";

// const navItems = [
//   { name: "Dashboard", path: "/user/dashboard", icon: LayoutDashboard },
//   { name: "Profile", path: "/user/profile", icon: UserRound },
//   { name: "Settings", path: "/user/settings", icon: Settings },
//   { name: "Notifications", path: "/user/notifications", icon: Bell },
//   { name: "Help", path: "/user/help", icon: HelpCircle },
// ];

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   return (
//     <>
//       {/* Mobile toggle button */}
//       <button
//         onClick={toggleSidebar}
//         className="lg:hidden fixed top-4 left-4 z-50 bg-gradient-to-r from-[#3C9BF9] to-[#9100BD] text-white p-2 rounded-full"
//       >
//         {isOpen ? <X size={22} /> : <Menu size={22} />}
//       </button>

//       <aside
//         className={`fixed top-0 left-0 h-screen w-72 border-r-2 border-gray-300 bg-white text-black flex flex-col transform transition-transform duration-300 ease-in-out z-40 ${
//           isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
//         }`}
//       >
//         {/* Logo */}
//         <div className="flex items-center justify-center gap-3 mt-6 mb-8">
//           <img
//             src={PsychoTalkLogoTrans}
//             alt="PsychoTalk Logo"
//             className="w-12 h-12 pointer-events-none"
//           />
//           <h1 className="text-2xl kanit font-gradient">PsychoTalk</h1>
//         </div>

//         {/* Navigation */}
//         <nav className="flex flex-col gap-2 px-4">
//           {navItems.map(({ name, path, icon: Icon }) => (
//             <NavLink
//               key={path}
//               to={path}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-5 py-2 rounded-full transition-all duration-300 font-['Roboto'] text-lg ${
//                   isActive
//                     ? "bg-gradient-to-r from-[#3C9BF9] to-[#9100BD] text-white shadow-md"
//                     : "text-gray-500 hover:bg-gray-100"
//                 }`
//               }
//             >
//               <Icon size={22} />
//               {name}
//             </NavLink>
//           ))}
//         </nav>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;


// import { NavLink } from "react-router-dom";
// import PsychoTalkLogoTrans from "../../assets/psychotalk_logo_trans.webp";
// import {
//   LayoutDashboard,
//   CircleUser,
//   Settings,
//   Bell,
//   HelpCircle,
// } from "lucide-react";

// const navItems = [
//   { name: "Dashboard", path: "/user/dashboard", icon: LayoutDashboard },
//   { name: "Profile", path: "/user/profile", icon: CircleUser },
//   { name: "Settings", path: "/user/settings", icon: Settings },
//   { name: "Notifications", path: "/user/notifications", icon: Bell },
//   { name: "Help", path: "/user/help", icon: HelpCircle },
// ];

// const Sidebar = () => {
//   return (
//     <aside className="fixed left-0 top-0 h-screen w-[18rem] border-r border-gray-400 bg-white flex flex-col">
//       {/* 🔹 Logo */}
//       <div className="flex items-center gap-3 justify-center mt-8 mb-5">
//         <img
//           src={PsychoTalkLogoTrans}
//           alt="Logo"
//           className="w-14 h-14 pointer-events-none"
//         />
//         <h1 className="text-4xl kanit bg-gradient-to-r from-[#3C9BF9] to-[#9100BD] bg-clip-text text-transparent">
//           PsychoTalk
//         </h1>
//       </div>

//       {/* 🔹 Navigation Links */}
//       <nav className="flex flex-col gap-2 py-4 px-6">
//         {navItems.map(({ name, path, icon: Icon }) => (
//           <NavLink
//             key={path}
//             to={path}
//             className={({ isActive }) =>
//               `flex items-center gap-3.5 px-5.5 py-2.5 rounded-full transition-all duration-200 text-lg font-['Roboto'] ${
//                 isActive
//                   ? "bg-gradient-to-r from-[#3C9BF9] to-[#9100BD] text-white font-medium"
//                   : "text-gray-500 hover:bg-gray-200"
//               }`
//             }
//           >
//             <Icon size={22} />
//             {name}
//           </NavLink>
//         ))}
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;

