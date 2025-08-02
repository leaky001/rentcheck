import React from "react";
import { motion } from "framer-motion";
import OverviewCard from "../../components/dashboard/OverviewCard";
import SpendingChart from "../../components/dashboard/SpendingChart";
import PaymentHistory from "../../components/dashboard/PaymentHistory";
import { useExpenses } from "../../context/ExpensesContext";

const Dashboard = () => {
  const { expenses } = useExpenses();

  // Group total amounts by category
  const categoryTotals = expenses.reduce((acc, curr) => {
    const key = curr.category?.trim() || "Others";
    acc[key] = (acc[key] || 0) + parseFloat(curr.amount);
    return acc;
  }, {});

  // Prepare data for chart and cards
  const chartData = Object.entries(categoryTotals).map(([category, amount]) => ({
    category,
    amount,
  }));

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-6">Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {chartData.map((item, index) => (
          <OverviewCard
            key={index}
            title={item.category}
            value={`₦${item.amount.toLocaleString()}`}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <SpendingChart data={chartData} />
        <PaymentHistory history={expenses} />
      </div>
    </motion.div>
  );
};

export default Dashboard;
