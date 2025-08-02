import React from "react";
import { motion } from "framer-motion";
import { FaMoneyBillWave, FaUsers, FaBolt } from "react-icons/fa";

const icons = {
  rent: <FaMoneyBillWave className="text-green-600 text-2xl" />,
  utilities: <FaBolt className="text-yellow-500 text-2xl" />,
  roommates: <FaUsers className="text-indigo-500 text-2xl" />,
};

const OverviewCard = ({ title, value, type }) => {
  return (
    <motion.div
      className="flex items-center gap-4 p-5 bg-white shadow-lg rounded-2xl"
      whileHover={{ scale: 1.05 }}
    >
      <div className="bg-gray-100 p-3 rounded-full">
        {icons[type] || icons["rent"]}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-xl font-bold text-[#631499]">{value}</h2>
      </div>
    </motion.div>
  );
};

export default OverviewCard;
