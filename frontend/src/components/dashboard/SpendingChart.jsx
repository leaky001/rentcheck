import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  PieChart, 
  BarChart3, 
  TrendingUp, 
  DollarSign,
  Calendar,
  Filter,
  Download,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

const SpendingChart = ({ data }) => {
  const [chartType, setChartType] = useState("pie"); // pie, bar, line
  const [timeRange, setTimeRange] = useState("month"); // week, month, quarter, year
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Enhanced spending data with more categories and time-based data
  const spendingData = [
    { category: "Rent", amount: 150000, percentage: 45, color: "bg-blue-500", icon: "🏠", trend: "+0%", status: "paid" },
    { category: "Utilities", amount: 35000, percentage: 10.5, color: "bg-green-500", icon: "⚡", trend: "+5%", status: "pending" },
    { category: "Groceries", amount: 28000, percentage: 8.4, color: "bg-yellow-500", icon: "🛒", trend: "+12%", status: "paid" },
    { category: "Internet", amount: 8000, percentage: 2.4, color: "bg-purple-500", icon: "🌐", trend: "+0%", status: "paid" },
    { category: "Transport", amount: 22000, percentage: 6.6, color: "bg-indigo-500", icon: "🚗", trend: "+8%", status: "pending" },
    { category: "Entertainment", amount: 18000, percentage: 5.4, color: "bg-pink-500", icon: "🎬", trend: "+15%", status: "paid" },
    { category: "Cleaning", amount: 5000, percentage: 1.5, color: "bg-orange-500", icon: "🧹", trend: "+0%", status: "paid" },
    { category: "Misc", amount: 12000, percentage: 3.6, color: "bg-gray-500", icon: "📦", trend: "+3%", status: "pending" }
  ];

  const timeRanges = [
    { value: "week", label: "This Week", data: spendingData.map(item => ({ ...item, amount: item.amount * 0.25 })) },
    { value: "month", label: "This Month", data: spendingData },
    { value: "quarter", label: "This Quarter", data: spendingData.map(item => ({ ...item, amount: item.amount * 3 })) },
    { value: "year", label: "This Year", data: spendingData.map(item => ({ ...item, amount: item.amount * 12 })) }
  ];

  const currentData = timeRanges.find(range => range.value === timeRange)?.data || spendingData;
  const totalSpending = currentData.reduce((sum, item) => sum + item.amount, 0);

  const getStatusIcon = (status) => {
    switch (status) {
      case "paid": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending": return <Clock className="w-4 h-4 text-yellow-500" />;
      case "overdue": return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid": return "text-green-600 bg-green-100";
      case "pending": return "text-yellow-600 bg-yellow-100";
      case "overdue": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Spending Breakdown</h2>
          <p className="text-sm text-gray-600">Track your expenses by category</p>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDetails(!showDetails)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            title={showDetails ? "Hide Details" : "Show Details"}
          >
            {showDetails ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            title="Export"
          >
            <Download className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center space-x-2 mb-6">
        <span className="text-sm text-gray-600">Time Range:</span>
        <div className="flex bg-gray-100 rounded-lg p-1">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={`px-3 py-1 text-sm rounded-md transition-all ${
                timeRange === range.value
                  ? "bg-white text-purple-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Type Selector */}
      <div className="flex items-center space-x-2 mb-6">
        <span className="text-sm text-gray-600">Chart Type:</span>
        <div className="flex bg-gray-100 rounded-lg p-1">
          {[
            { value: "pie", label: "Pie Chart", icon: <PieChart className="w-4 h-4" /> },
            { value: "bar", label: "Bar Chart", icon: <BarChart3 className="w-4 h-4" /> },
            { value: "line", label: "Trend", icon: <TrendingUp className="w-4 h-4" /> }
          ].map((type) => (
            <button
              key={type.value}
              onClick={() => setChartType(type.value)}
              className={`px-3 py-1 text-sm rounded-md transition-all flex items-center space-x-1 ${
                chartType === type.value
                  ? "bg-white text-purple-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {type.icon}
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Total Spending Summary */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Spending</p>
            <p className="text-2xl font-bold text-gray-900">₦{totalSpending.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">vs Last Period</p>
            <p className="text-lg font-semibold text-green-600">+8.5%</p>
          </div>
        </div>
      </div>

      {/* Chart Display */}
      <div className="mb-6">
        {chartType === "pie" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart Visualization */}
            <div className="relative w-48 h-48 mx-auto">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {currentData.map((item, index) => {
                  const previousTotal = currentData
                    .slice(0, index)
                    .reduce((sum, prevItem) => sum + prevItem.percentage, 0);
                  const startAngle = (previousTotal / 100) * 360;
                  const endAngle = ((previousTotal + item.percentage) / 100) * 360;
                  
                  const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                  const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                  const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                  const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                  
                  const largeArcFlag = item.percentage > 50 ? 1 : 0;
                  
                  return (
                    <path
                      key={item.category}
                      d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                      fill={item.color.replace('bg-', '').replace('-500', '')}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setSelectedCategory(selectedCategory === item.category ? null : item.category)}
                    />
                  );
                })}
                <circle cx="50" cy="50" r="15" fill="white" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{timeRange}</div>
                  <div className="text-sm text-gray-600">Overview</div>
                </div>
              </div>
            </div>

            {/* Category Legend */}
            <div className="space-y-3">
              {currentData.map((item, index) => (
                <motion.div
                  key={item.category}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                    selectedCategory === item.category ? 'bg-purple-50 border border-purple-200' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedCategory(selectedCategory === item.category ? null : item.category)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="font-medium text-gray-900">{item.category}</div>
                      <div className="text-sm text-gray-500">{item.percentage}%</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">₦{item.amount.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">{item.trend}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {chartType === "bar" && (
          <div className="space-y-4">
            {currentData.map((item, index) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-medium text-gray-900">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-gray-900">₦{item.amount.toLocaleString()}</span>
                    <span className="text-gray-500 ml-2">({item.percentage}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {chartType === "line" && (
          <div className="text-center py-8">
            <TrendingUp className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Spending Trends</h3>
            <p className="text-gray-600">Track your spending patterns over time</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">+12%</div>
                <div className="text-sm text-gray-600">This Month</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">₦28K</div>
                <div className="text-sm text-gray-600">Average</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Detailed Breakdown */}
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-gray-200 pt-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Breakdown</h3>
          <div className="space-y-3">
            {currentData.map((item, index) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="font-medium text-gray-900">{item.category}</div>
                    <div className="text-sm text-gray-500">{item.trend} from last period</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">₦{item.amount.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">{item.percentage}% of total</div>
                  </div>
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                    {getStatusIcon(item.status)}
                    <span className="capitalize">{item.status}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Insights */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-2">💡 Spending Insights</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Rent accounts for {Math.round(currentData[0]?.percentage || 0)}% of your total expenses</li>
          <li>• Utilities increased by 5% this month - consider energy-saving measures</li>
          <li>• Entertainment spending is up 15% - review your budget allocation</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default SpendingChart;
