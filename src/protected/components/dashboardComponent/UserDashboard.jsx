import React from 'react'
import { Link } from 'react-router-dom'
const UserDashboard = () => {
  return (
    <div>
          <h2 className="text-3xl font-semibold text-[#011621] dark:text-white ">Welcome to PsychoTalk, {sessionStorage.getItem("name")} 👋</h2>
      <p className="mt-2 text-gray-600 dark:text-white">
        How are you feeling today?
      </p>
      <div className="flex flex-col mt-8 gap-4">
        <p className="text-2xl text-[#058eb8]  font-bold">Quick Actions</p>
        

        <div className="flex flex-wrap gap-4">
          <Link to="/user/share"
            className="flex  items-center bg-indigo-600 text-white  px-4 py-2 h-14 self-center rounded-xl shadow-md shadow-gray-500 hover:bg-indigo-700">
            Ask a Question

          </Link>
          <Link to="/user/support"
            className="flex  items-center bg-blue-500 text-white px-4 py-2 h-14 self-center rounded-xl shadow-md shadow-gray-500 hover:bg-indigo-700">
            View My Questions

          </Link>
          <Link to="/user/appointments"
            className="flex  items-center bg-green-500 text-white px-4 py-2 h-14 self-center rounded-xl shadow-md shadow-gray-500 hover:bg-indigo-700">
            My Appointments

          </Link>

        </div>
      </div>
        </div>
  )
}

export default UserDashboard