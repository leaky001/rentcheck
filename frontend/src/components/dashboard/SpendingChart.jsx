import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Extendable color palette
const COLORS = [
  "#B093EF", "#A340E0", "#631499", "#3C0964",
  "#FBF0FF", "#E1C6FF", "#CFA3F0", "#AC7EDA"
];

const RADIAN = Math.PI / 180;

// Label renderer for each slice
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const SpendingChart = ({ data = [] }) => {
  // Handle no data
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg dark:bg-eerieBlack">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
          Spending Breakdown
        </h3>
        <p className="text-gray-500 dark:text-gray-400">No data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg dark:bg-eerieBlack">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
        Spending Breakdown
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={90}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingChart;
