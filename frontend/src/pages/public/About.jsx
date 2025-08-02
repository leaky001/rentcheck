import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      className="max-w-3xl mx-auto py-16 px-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-indigo-600 mb-4">About RentCheck</h2>
      <p className="text-gray-700 text-lg">
        RentCheck is designed to simplify shared rent and expense tracking for roommates and co-tenants. With real-time updates, clear distributions, and history logs, everyone stays on the same page—no more awkward conversations or surprises.
      </p>
    </motion.div>
  );
};

export default About;
