import { Link } from "react-router-dom";

const ProfileDropdown = () => {

  const userName = sessionStorage.getItem("name") || "John Doe";
  const email = sessionStorage.getItem("email") || "john@example.com";

  const logoutHandler = ()=>{
    localStorage.clear();
  }
  return (
    <div className="absolute right-0 mt-3 w-60 bg-white border border-gray-200 rounded-xl shadow-lg p-3 z-50">
      <div className="flex items-center gap-3 p-2 border-b border-gray-100">
        <img
          src={"https://i.pravatar.cc/80?u=" + sessionStorage.getItem("name")}
          alt="User"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="text-sm font-semibold text-gray-800">{userName}</p>
          <p className="text-xs text-gray-500">{email}</p>
        </div>
      </div>
      <ul className="mt-2">
        <li>
          <Link
            to="/user/profile"
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



