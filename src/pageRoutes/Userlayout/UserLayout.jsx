import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { UserNavbar } from "./UserNavbar";
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

