import React from "react";
import { motion } from "framer-motion";

const Tips = () => {
  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Roommate Tips</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Communicate regularly about shared expenses.</li>
        <li>Set clear expectations on payment deadlines.</li>
        <li>Use RentCheck to track and split expenses fairly.</li>
        <li>Rotate responsibilities like cleaning or shopping.</li>
        <li>Respect each other’s privacy and space.</li>
      </ul>
    </motion.div>
  );
};

export default Tips;
