import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/home";
import Login from "../pages/login";
// import { Welcome } from '../userPages/Welcome';
import { PublicLayout } from "./PublicLayout";
import { UserLayout } from "./UserLayout";
import SignUP from "../pages/signup";
import PublicExperts from "../pages/publicExperts";
import About from "../pages/about";
import Contact from "../pages/contactUs";
import FAQs from "../pages/faq";

//user
import Dashboard from "../user/userPages/sidebarPages/Dashboard";
import UserAppointments from "../user/userPages/sidebarPages/UserAppointments";
import Profile from "../user/userPages/sidebarPages/Profile";
import Settings from "../user/userPages/sidebarPages/Settings";
import Notifications from "../user/userPages/sidebarPages/Notifications";
import Help from "../user/userPages/sidebarPages/Help";
import Share from "../user/userPages/navbarPages/Share";
import Support from "../user/userPages/navbarPages/Support";
import Experts from "../user/userPages/navbarPages/Experts";
import MotivationalPosts from "../user/userPages/navbarPages/MotivationalPosts";
import Discussion from "../user/userPages/otherPages/Discussion";
import ExpertDetails from "../user/userPages/otherPages/ExpertDetails";

//expert
import { ExpertLayout } from './ExpertLayout';
import ExpertDashboard from "../expert/expertPages/sidebarPages/ExpertDashboard";
import ExpertProfile from "../expert/expertPages/sidebarPages/ExpertProfile";
import ExpertHelp  from "../expert/expertPages/sidebarPages/ExpertHelp";
import ExpertSettings from "../expert/expertPages/sidebarPages/ExpertSettings";
import ExpertNotification from '../expert/expertPages/sidebarPages/ExpertNotifications';
import Motivations from "../expert/expertPages/navbarPages/Motivations";
import Appointments from "../expert/expertPages/navbarPages/Appointments";
import ExpertSupport from '../expert/expertPages/navbarPages/Support';
import ExpertDiscussion from '../expert/expertPages/otherPages/Discussion';

export const AppRoutes = () => (
  <Routes>
    {/* Public layout routes */}
    <Route element={<PublicLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/experts" element={<PublicExperts/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUP />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQs />} />
    </Route>

    {/* User layout routes */}
    <Route element={<UserLayout />}>
      {/* User sidebar Routes */}
      <Route path="/user/dashboard" element={<Dashboard />} />
      <Route path="/user/appointments" element={<UserAppointments />} />
      <Route path="/user/profile" element={<Profile />} />
      <Route path="/user/settings" element={<Settings />} />
      <Route path="/user/notifications" element={<Notifications />} />
      <Route path="/user/help" element={<Help />} />
      {/*User  Navbar Routes */}
      <Route path="/user/share" element={<Share />} />
      <Route path="/user/support" element={<Support />} />
      <Route path="/user/experts" element={<Experts />} />
       <Route path="/user/expertDetails" element={<ExpertDetails />} />
      
     
      <Route path="/user/discussion" element={<Discussion />} />
      <Route path="/user/motivations" element={<MotivationalPosts />} />
    </Route>

    {/* expert layout routes */}

    <Route element={<ExpertLayout />}>
      {/* Expert Sidebar Routes */}
      <Route path="/expert/dashboard" element={<ExpertDashboard />} />
      <Route path="/expert/profile" element={<ExpertProfile />} />
      <Route path="/expert/settings" element={<ExpertSettings />} />
      <Route path="/expert/notifications" element={<ExpertNotification />} />
      <Route path="/expert/help" element={<ExpertHelp />} />
      {/* Expert Navbar Routes */}
      <Route path="/expert/appointments" element={<Appointments />} />
      <Route path="/expert/motivations" element={<Motivations />} />
      <Route path="/expert/support" element={<ExpertSupport />} />
      <Route path="/expert/discussion" element={<ExpertDiscussion />} />
     
    </Route>

  </Routes>
);
