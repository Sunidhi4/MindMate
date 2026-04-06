import { Link } from 'react-router-dom'
import ExpertDashboard from '../components/dashboardComponent/ExpertDashboard';
import UserDashboard from '../components/dashboardComponent/UserDashboard';
const Dashboard = () => {

  return (
    <div className="">
      {
        (localStorage.getItem("role") === "USER")
          ? 
          <UserDashboard />
          :
          <ExpertDashboard />
      }
    </div>
  );
};

export default Dashboard;

