import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-purple-700">
          RentCheck
        </Link>

        <div className="space-x-6 text-gray-800 font-medium">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/roommates">Roommates</Link>
          <Link to="/expenses">Expenses</Link>
          <Link to="/tips">Tips</Link>
          <Link to="/settings">Settings</Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="text-red-500 font-semibold hover:underline"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
