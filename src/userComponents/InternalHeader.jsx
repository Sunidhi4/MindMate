
import { Link } from 'react-router-dom';

export const InternalHeader = ({ title }) => {
  return (
    <header className="bg-cyan-700 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">{title}</h1>
      <nav className="space-x-4">
        <Link to="/user/share" className="hover:underline">Share</Link>
        <Link to="/user/support" className="hover:underline">Support</Link>
        <Link to="/user/experts" className="hover:underline">Experts</Link>
        <Link to="/user/routine" className="hover:underline">Routine</Link>
        <Link to="/" className="hover:underline">Logout</Link>
      </nav>
    </header>
  );
};