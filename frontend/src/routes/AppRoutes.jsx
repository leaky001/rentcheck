import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import PublicLayout from "../layouts/PublicLayout";
import MainLayout from "../layouts/MainLayout";

// Public Pages
import Landing from "../pages/public/Landing";
import About from "../pages/public/About";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../pages/public/NotFound";

// Dashboard Pages
import Dashboard from "../pages/dashboard/Dashboard";
import Expenses from "../pages/dashboard/Expenses";
import Roommates from "../pages/dashboard/Roommates";
import Settings from "../pages/dashboard/Settings";
import Tips from "../pages/dashboard/Tips";

// Context
import { useAuth } from "../context/AuthContext";

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected Routes */}
      {user ? (
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/roommates" element={<Roommates />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/tips" element={<Tips />} />
        </Route>
      ) : (
        // Redirect any attempt to access dashboard routes to login
        <>
          <Route path="/dashboard" element={<Navigate to="/login" />} />
          <Route path="/expenses" element={<Navigate to="/login" />} />
          <Route path="/roommates" element={<Navigate to="/login" />} />
          <Route path="/settings" element={<Navigate to="/login" />} />
          <Route path="/tips" element={<Navigate to="/login" />} />
        </>
      )}

      {/* Catch-all Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
