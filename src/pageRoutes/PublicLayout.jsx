import { Outlet } from "react-router-dom";
// import Navbar from "../components/common/Navbar";
import Navbar from '../public/components/Navbar'
import Scroll from "../public/components/scroll";
import Footer from "../public/components/Footer";

export const PublicLayout = () => {
  return (
    <>
      <Scroll />
      <Navbar />
      <main className="min-h-screen">
        <Outlet /> {/* Child route components render here */}
      </main>
      <Footer />
    </>
  );
};
