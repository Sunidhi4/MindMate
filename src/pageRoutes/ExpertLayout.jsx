import { useState } from 'react';
import { ExpertNavbar } from '../expert/expertComponents/ExpertNavbar'
import { ExpertSidebar } from '../expert/expertComponents/ExpertSidebar';
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
      <main className="flex-1 pt-10 p-6  bg-linear-to-br from-[#e2c8f0] to-[#c9e7f7]  ">
          <Outlet />
        </main>
      </div>    
    </div>
  )
}
