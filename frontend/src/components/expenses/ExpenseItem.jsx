import React from "react";
import { motion } from "framer-motion";

const ExpenseItem = ({ expense, onDelete }) => {
  return (
    <motion.div
      className="border rounded-lg p-4 bg-gray-50 flex justify-between items-center mb-2 shadow-sm"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h3 className="font-semibold text-lg">{expense.title}</h3>
        <p className="text-sm text-gray-500">
          {expense.category} • {new Date(expense.date).toLocaleDateString()}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-indigo-600 font-bold">
          ₦{parseFloat(expense.amount).toLocaleString()}
        </span>
        <button
          onClick={() => onDelete(expense.id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default ExpenseItem;
