import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home";
import Login from "../pages/Login";
// import { Welcome } from '../userPages/Welcome';
import { PublicLayout } from "./PublicLayout";
import { UserLayout } from "./UserLayout";
import SignUP from "../pages/signup";
import About from "../pages/about";
import Contact from "../pages/contactUs";
import FAQs from "../pages/faq";
import Dashboard from "../userPages/dashboard";
import Profile from "../userPages/Profile";
import Settings from "../userPages/Settings";
import Notifications from "../userPages/Notifications";
import Help from "../userPages/Help";
import Share from "../userPages/Share";
import Support from "../userPages/Support";
import Experts from "../userPages/Experts";
import Routine from "../userPages/Routine";
import Discussion from "../userComponents/Discussion";
import ExpertDetails from "../userPages/ExpertDetails";

export const AppRoutes = () => (
  <Routes>
    {/* Public layout routes */}
    <Route element={<PublicLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUP />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQs />} />
    </Route>

    {/* User layout routes */}
    <Route element={<UserLayout />}>
      {/* User Navbar Routes */}
      <Route path="/user/dashboard" element={<Dashboard />} />
      <Route path="/user/profile" element={<Profile />} />
      <Route path="/user/settings" element={<Settings />} />
      <Route path="/user/notifications" element={<Notifications />} />
      <Route path="/user/help" element={<Help />} />
      {/* Sidebar Routes */}
      <Route path="/user/share" element={<Share/>} />
      <Route path="/user/support" element={<Support/>} />
      <Route path="/user/experts" element={<Experts/>} />
      <Route path="//user/expertDetails" element={<ExpertDetails/>} />
      <Route path="/user/discussion" element={<Discussion/>} />
      <Route path="/user/routine" element={<Routine/>} />
    </Route>
  </Routes>
);
