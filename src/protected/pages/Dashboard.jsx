import { Link } from 'react-router-dom'
import ExpertDashboard from '../components/dashboardComponent/ExpertDashboard';
import UserDashboard from '../components/dashboardComponent/UserDashboard';
const Dashboard = () => {

  return (
    <div className="p-8 ">
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

