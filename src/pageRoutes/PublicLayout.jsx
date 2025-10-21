import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Scroll from "../components/scroll";
import Footer from "../components/common/Footer";

export const PublicLayout = () => {
  return (
    <>
      <Scroll />
      <Navbar />
      <main>
        <Outlet /> {/* Child route components render here */}
      </main>
      <Footer />
    </>
  );
};
