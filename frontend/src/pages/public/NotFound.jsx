import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <motion.div
      className="h-screen flex flex-col items-center justify-center text-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-6xl font-bold text-indigo-700 mb-4">404</h1>
      <p className="text-gray-600 mb-6 text-lg">Oops! Page not found.</p>
      <Link to="/" className="text-indigo-600 hover:underline text-lg">
        Go back to Homepage
      </Link>
    </motion.div>
  );
};

export default NotFound;
