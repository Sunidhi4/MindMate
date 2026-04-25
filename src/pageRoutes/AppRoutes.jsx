import { Routes, Route } from "react-router-dom";
import HomePage from "../public/pages/home";
import Login from "../public/components/login";
import ProtectedRoute from "../utils/ProtectedRoute";
import PublicRoute from "../utils/PublicRoute";

import { PublicLayout } from "./PublicLayout";
import { UserLayout } from "./Userlayout/UserLayout";
import SignUP from "../public/components/signup";
import PublicExperts from "../public/pages/publicExperts";
import About from "../public/pages/about";
import Contact from "../public/pages/contactUs";
import FAQs from "../public/pages/faq";
import Privacy from "../public/pages/Privacy";
import Terms from "../public/pages/Terms";

//protected 
import MotivationalPosts from "../protected/pages/MotivationalPosts";

//user
import Dashboard from "../protected/pages/Dashboard";
import UserAppointments from "../protected/pages/UserAppointments";
import Profile from "../protected/pages/Profile";
import Settings from "../protected/pages/Settings";
import Notifications from "../protected/pages/Notifications";
import Help from "../protected/pages/Help";
import Share from "../protected/pages/Share";
import Support from "../protected/pages/Support";
import Experts from "../protected/pages/Experts";

import Discussion from "../protected/pages/Discussion";
import ExpertDetails from "../protected/pages/ExpertDetails";
import BookAppointment from "../protected/pages/BookAppointment";
import QuickChat from "../protected/pages/QuickChat";

//expert
import { ExpertLayout } from './expertLayout/ExpertLayout';

import ExpertVerification from "../protected/pages/ExpertVerification";
import VerificationSubmitted from "../protected/pages/VerificationSubmitted";
import ExpertAppointments from "../protected/pages/ExpertAppointments";

export const AppRoutes = () => (
  <Routes>
    {/* Public layout routes */}
    <Route element={<PublicLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/experts" element={<PublicExperts />} />
      <Route element={<PublicRoute/>}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUP />} />
      </Route>
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQs />} />
      <Route path="/privacy" element={<Privacy/>} />
      <Route path="/terms" element={<Terms/>} />
    </Route>

    {/* User layout routes */}
    <Route element={<ProtectedRoute  allowedRoles={["USER"] }/>}>
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

        <Route path="/user/bookAppointment" element={<BookAppointment/>}/>
        <Route path="/user/discussion" element={<Discussion />} />
        <Route path="/user/motivations" element={<MotivationalPosts />} />
        <Route path="/user/quickChat" element={<QuickChat />} />
      </Route>
    </Route>
    {/* expert layout routes */}

    <Route element={<ProtectedRoute allowedRoles={["EXPERT"]} />}>
      <Route element={<ExpertLayout />}>
        {/* Expert Sidebar Routes */}
        <Route path="/expert/dashboard" element={<Dashboard />} />
        <Route path="/expert/profile" element={<Profile />} />
        <Route path="/expert/settings" element={<Settings />} />
        <Route path="/expert/notifications" element={<tNotification />} />
        <Route path="/expert/help" element={<Help />} />
        {/* Expert Navbar Routes */}
        <Route path="/expert/appointments" element={<ExpertAppointments />} />
        <Route path="/expert/support" element={<Support />} />
        <Route path="/expert/discussion" element={<Discussion />} />
        <Route path="/expert/motivations" element={<MotivationalPosts />} />

      </Route>
      <Route path="/expert/verification" element={<ExpertVerification/>}/>
      <Route path="/expert/underReview" element={<VerificationSubmitted/>} />
    </Route>

    <Route element={<ProtectedRoute allowedRoles={["USER" , "EXPERT"]}/>}>

    </Route>
  </Routes>
);
