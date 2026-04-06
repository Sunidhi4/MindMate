import { useState } from 'react';
import { ExpertNavbar } from './ExpertNavbar'
import { ExpertSidebar } from './ExpertSidebar';
import { Outlet } from 'react-router-dom'
export const ExpertLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <ExpertSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Right side: Navbar + content */}
      <div
        className={`
          flex flex-col flex-1 transition-all duration-300
          ${!sidebarOpen ? "lg:ml-72" : ""} 
        `}
      >
        {/* Navbar */}
        <ExpertNavbar />

        {/* Main content area */}
      <main className="flex-1 bg-linear-to-br from-[#e6d3f0] dark:from-[#11051f] to-[#daeef8] dark:to-[#07192e] ">
          <Outlet />
        </main>
      </div>    
    </div>
  )
}
