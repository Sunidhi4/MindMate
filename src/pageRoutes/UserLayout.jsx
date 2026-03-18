import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../protected/layout/Sidebar";
import {UserNavbar} from "../protected/layout/UserNavbar"

export const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navbarActiveLink , setNavbarActiveLink] = useState(false);

  return (
    <div className="flex bg-gray-100  min-h-screen">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Right side: Navbar + content */}
      <div
        className={`
          flex flex-col flex-1 transition-all duration-300
          ${!sidebarOpen ? "lg:ml-72" : ""} 
        `}
      >
        {/* Navbar */}
        <UserNavbar navbarActiveLink={navbarActiveLink} setNavbarActiveLink={setNavbarActiveLink}  />

        {/* Main content area */}
        <main className="flex-1 bg-gradient  dark:from-[#030e1f] dark:to-[#100114]  ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};


// import { useState } from "react";
// import Sidebar from "../userComponents/common/Sidebar";
// import { UserNavbar } from "../userComponents/common/UserNavbar";
// import { Outlet, useLocation } from "react-router-dom";

// export const UserLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

//   // Current route title (optional)
//   const location = useLocation();
//   const routeTitle = location.pathname.split("/")[2] || "Dashboard";

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

//       {/* Main content area */}
//       <div
//   className={`flex-1 flex flex-col transition-all duration-300 ${
//     sidebarOpen ? "ml-72" : "ml-0 lg:ml-72"
//   }`}
// >

//         <UserNavbar title={routeTitle.charAt(0).toUpperCase() + routeTitle.slice(1)} />
//         <main className="flex-1 p-8">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };


// import { Outlet } from "react-router-dom";
// import Sidebar from "../userComponents/common/Sidebar";
// import { UserNavbar } from "../userComponents/common/UserNavbar";

// export const UserLayout = () => {
//   return (
//     <div className="flex bg-gray-100 min-h-screen">
//       {/* 🔹 Sidebar (Fixed Left) */}
//       <Sidebar />

//       {/* 🔹 Right Section: Navbar + Page Content */}
//       <div className="flex flex-col flex-1 ml-[18rem]"> 
//         {/* UserNavbar stays at top */}
//         <UserNavbar title="Dashboard" /> 

//         {/* Main content area */}
//         <main className="p-6 flex-1">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

