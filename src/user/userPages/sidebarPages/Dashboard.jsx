import { Link } from 'react-router-dom'
const Dashboard = () => {
  return (
    <div className="p-8 ">
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



      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow-md p-4 rounded-xl text-center">
          <h2 className="text-lg font-semibold">Questions Posted</h2>
          <p className="text-2xl font-bold text-indigo-600">6</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-xl text-center">
          <h2 className="text-lg font-semibold">Answers Received</h2>
          <p className="text-2xl font-bold text-indigo-600">10</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-xl text-center">
          <h2 className="text-lg font-semibold">Appointments</h2>
          <p className="text-2xl font-bold text-indigo-600">2</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-xl text-center">
          <h2 className="text-lg font-semibold">Active Consultations</h2>
          <p className="text-2xl font-bold text-indigo-600">1</p>
        </div>
        </div> */}

{/* 
        <div className="bg-white shadow-md p-4 rounded-xl">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <ul className="text-gray-600 space-y-2">
          <li>🗓️ Appointment with Dr. Patel confirmed for 29 Oct 2025.</li>
          <li>💬 You received an answer from Dr. Sharma.</li>
          <li>📄 Your question “How to manage anxiety?” got 3 replies.</li>
        </ul>
      </div> */}

      </div>
      );
};

      export default Dashboard;


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Search, LogOut, ClipboardList, UserRound, Bell } from "lucide-react";
// import { toast } from "react-toastify";

// import UserAvatar from "../components/userAvatar";
// import DashboardView from "../userComponents/dashboard/DashboardView";
// import AccountView from "../userComponents/dashboard/AccountView";
// // import { useUser } from "../context/UserContext";

// export default function Dashboard() {
//   const [activeTab, setActiveTab] = useState("sessions");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [Box, setBox] = useState(false);
//   // const { userName } = useUser();
//   // const avatarUrl = `https://robohash.org/${userName}?set=set5&size=50x50`;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleResize = () => setIsSidebarOpen(window.innerWidth >= 768);
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("name");
//     localStorage.removeItem("email");
//     toast.success("Logged out!");
//     navigate("/");
//   };

//   const CustomButton = ({ children, onClick, className }) => (
//     <button
//       onClick={onClick}
//       className={`px-4 py-2 rounded-md transition-all duration-300 ${className}`}
//     >
//       {children}
//     </button>
//   );

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
//   const toggleBox = () => setBox(!Box);

//   return (
//     <div className="flex h-screen bg-[#21232f] text-white">
//       {/* Sidebar */}
//       <aside className={`${
//         isSidebarOpen ? "w-64 " : "hidden"
//       } p-4 bg-[#21232f] flex flex-col justify-between border-r border-[#e4e6f3ab]`}>
//         <div>
//           <h1 className="text-[48px] font-semibold font-Chakra font-gradient">SynCodex</h1>
//           <UserAvatar />
//           <nav className="mt-6 space-y-2">
//             <CustomButton
//               className={`w-full flex items-center justify-center cursor-pointer text-xl ${
//                 activeTab === "sessions" ? "bg-[#3D415A]" : "bg-[#21232f] hover:bg-[#3D415A]"
//               }`}
//               onClick={() => setActiveTab("sessions")}
//             >
//               <ClipboardList size={25} className="mr-2" />Activities
//             </CustomButton>
//             <CustomButton
//               className={`w-full flex items-center justify-center cursor-pointer text-xl ${
//                 activeTab === "account" ? "bg-[#3D415A]" : "bg-[#21232f] hover:bg-[#3D415A]"
//               }`}
//               onClick={() => setActiveTab("account")}
//             >
//               <UserRound size={25} className="mr-2" />Account
//             </CustomButton>
//             <CustomButton
//               className="w-full flex items-center justify-center text-xl  text-red-400 hover:bg-[#3D415A] cursor-pointer"
//               onClick={handleLogout}
//             >
//               <LogOut size={25} className="mr-2" /> Logout
//             </CustomButton>
//           </nav>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 overflow-auto">
//         {/* Top Bar */}
//         <div className="flex items-center py-5 border-b border-[#e4e6f3ab] max-md:justify-between sticky top-0 bg-[#21232f]">
//           <CustomButton
//             onClick={toggleSidebar}
//             className="p-3 ml-2 bg-[#3D415A] text-white cursor-pointer text-lg max-md:hidden"
//           >
//             ☰
//           </CustomButton>
//           <h1 className="text-[48px] font-semibold font-Chakra font-gradient ml-2 md:hidden w-[60%]">SynCodex</h1>
//           <div className="w-full flex justify-center items-center max-md:hidden">
//             <Search className="relative cursor-pointer left-7 text-white" size={18} />
//             <input
//               type="text"
//               placeholder="Search project or session..."
//               className="w-[40%] bg-[#3D415A] placeholder-[#E4E6F3] text-white pl-10 pr-3 py-2 rounded-md focus:outline-none"
//             />
//           </div>
//           <CustomButton className="text-white bg-[#3D415A] mr-2 cursor-pointer">
//             <Bell size={25} />
//           </CustomButton>
//           <img
//             // src={avatarUrl}
//             alt={"userName"}
//             className="w-10 h-10 rounded-full md:hidden mr-3"
//             onClick={toggleBox}
//           />
//           <div className={`${
//             Box ? "" : "hidden"
//           } p-4 bg-[#21232f] flex flex-col shadow-xl rounded-xl justify-between absolute top-25 right-15`}>
//             <nav className="mt-6 space-y-2">
//               <CustomButton
//                 className={`w-full flex items-center justify-center cursor-pointer text-xl ${
//                   activeTab === "sessions" ? "bg-[#3D415A]" : "bg-[#21232f] hover:bg-[#3D415A]"
//                 }`}
//                 onClick={() => setActiveTab("sessions")}
//               >
//                 <ClipboardList size={25} className="mr-2" />Activities
//               </CustomButton>
//               <CustomButton
//                 className={`w-full flex items-center justify-center cursor-pointer text-xl ${
//                   activeTab === "account" ? "bg-[#3D415A]" : "bg-[#21232f] hover:bg-[#3D415A]"
//                 }`}
//                 onClick={() => setActiveTab("account")}
//               >
//                 <UserRound size={25} className="mr-2" />Account
//               </CustomButton>
//               <CustomButton
//                 className="w-full flex items-center justify-center text-xl  text-red-400 hover:bg-[#3D415A] cursor-pointer"
//                 onClick={handleLogout}
//               >
//                 <LogOut size={25} className="mr-2" /> Logout
//               </CustomButton>
//             </nav>
//           </div>
//         </div>

//         {/* Content Switcher */}
//         {activeTab === "sessions" ? <DashboardView /> : <AccountView />}
//       </main>
//     </div>
//   );
// }