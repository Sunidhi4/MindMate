import { Link } from "react-router-dom";

const ProfileDropdown = () => {

  const fullName = sessionStorage.getItem("name") || "John Doe";
  const email = sessionStorage.getItem("email") || "john@example.com";

  const logoutHandler = ()=>{
    localStorage.clear();
  }
  return (
    <div className="absolute right-0 mt-3 w-60 bg-white border border-gray-200 rounded-xl shadow-lg p-3 z-50">
      <div className="flex items-center gap-3 p-2 border-b border-gray-100">
        <img
          src="https://i.pravatar.cc/40"
          alt="User"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="text-sm font-semibold text-gray-800">{fullName}</p>
          <p className="text-xs text-gray-500">{email}</p>
        </div>
      </div>
      <ul className="mt-2">
        <li>
          <Link
            to="/expert/profile"
            className="block px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
          >
            My Profile
          </Link>
        </li>
        <li>
          <Link
            to="/user/settings"
            className="block px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
          >
            Settings
          </Link>
        </li>
        <li>
          <Link
          onClick={logoutHandler}
            to="/"
            className="block px-3 py-2 rounded-md hover:bg-gray-100 text-red-600 font-medium"
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;



// import { Link } from "react-router-dom";
// import { UserRound, Settings, LogOut } from "lucide-react";

// const ProfileDropdown = ({ onClose }) => {
//   return (
//     <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
//       <div className="p-3 border-b">
//         <p className="text-sm font-semibold text-gray-800">Harsh Gupta</p>
//         <p className="text-xs text-gray-500">harsh@mail.com</p>
//       </div>

//       <div className="flex flex-col p-2">
//         <Link
//           to="/user/profile"
//           onClick={onClose}
//           className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg text-gray-700"
//         >
//           <UserRound size={18} /> Profile
//         </Link>

//         <Link
//           to="/user/settings"
//           onClick={onClose}
//           className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg text-gray-700"
//         >
//           <Settings size={18} /> Settings
//         </Link>

//         <Link
//           to="/login"
//           onClick={onClose}
//           className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg text-red-500"
//         >
//           <LogOut size={18} /> Logout
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ProfileDropdown;
