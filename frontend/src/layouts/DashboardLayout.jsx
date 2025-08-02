import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info("Logged out");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-indigo-600 text-white p-4 flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold">
          RentCheck
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">{user?.name}</span>
          <button
            onClick={handleLogout}
            className="bg-white text-indigo-600 px-3 py-1 rounded hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-grow bg-gray-50 p-4">
        <Outlet />
      </main>

      <footer className="text-center text-gray-500 text-sm p-4">
        &copy; {new Date().getFullYear()} RentCheck. All rights reserved.
      </footer>
    </div>
  );
};

export default DashboardLayout;
