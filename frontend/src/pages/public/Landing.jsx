import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-purple-100 to-indigo-100 flex flex-col">
      <nav className="flex justify-between items-center p-6">
        <div className="flex items-center gap-2">
        
          <span className="text-xl font-semibold text-indigo-700">RentCheck</span>
        </div>
        <div className="space-x-4">
          <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
          <Link to="/register" className="text-white bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700 transition">Get Started</Link>
        </div>
      </nav>

      <motion.main
        className="flex-1 flex flex-col items-center justify-center text-center px-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-5xl font-bold text-indigo-700 mb-4">Split rent without the drama</h1>
        <p className="text-gray-600 text-lg max-w-2xl mb-8">
          Keep track of shared housing expenses, manage roommates, and ensure everyone pays their fair share — all in one place.
        </p>
        <Link to="/register" className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
          Start Managing Now
        </Link>
      </motion.main>

      <footer className="text-center py-4 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} RentCheck. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
