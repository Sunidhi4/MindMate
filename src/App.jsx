import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AppRoutes } from "./pageRoutes/AppRoutes";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
      />
      <Router>
        <AppRoutes/>
      </Router>
    </>
  );
};

export default App;
