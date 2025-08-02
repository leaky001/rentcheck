import React from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

const responsibilities = [
  "",
  "Pays Rent",
  "Pays Electricity",
  "Buys Groceries",
  "Handles Internet",
  "Does Cleaning",
];

const RoommateCard = ({ roommate, onDelete, onResponsibilityChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-md rounded p-4"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-medium">{roommate.name}</span>
        <button
          onClick={() => onDelete && onDelete(roommate.id)}
          className="text-red-500 hover:text-red-700"
          title="Remove Roommate"
          type="button"
        >
          <Trash2 />
        </button>
      </div>

      <div className="text-sm mb-1">Share: {roommate.share}%</div>

      <label className="text-sm block mb-1 font-medium">Responsibility</label>
      <select
        value={roommate.responsibility || ""}
        onChange={(e) => onResponsibilityChange(roommate.id, e.target.value)}
        className="w-full border rounded px-2 py-1 text-sm"
      >
        {responsibilities.map((option) => (
          <option key={option} value={option}>
            {option || "Select responsibility"}
          </option>
        ))}
      </select>
    </motion.div>
  );
};

export default RoommateCard;
