import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useExpenses } from "../../context/ExpensesContext";

const ExpenseForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.category) {
      toast.error("Please fill in all fields");
      return;
    }

    onAdd({
      ...formData,
      id: Date.now(),
      amount: parseFloat(formData.amount),
      date: new Date().toISOString(),
    });

    setFormData({ title: "", amount: "", category: "" });
    toast.success("Expense added!");
  };

  return (
    <motion.form
      className="bg-white shadow-md rounded-lg p-4 space-y-4"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mt-1"
          placeholder="e.g. Electricity bill"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Amount</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mt-1"
          placeholder="e.g. 5000"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mt-1"
        >
          <option value="">Select category</option>
          <option value="Rent">Rent</option>
          <option value="Utility">Utility</option>
          <option value="Grocery">Grocery</option>
          <option value="Misc">Miscellaneous</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded py-2"
      >
        Add Expense
      </button>
    </motion.form>
  );
};

export default ExpenseForm;
