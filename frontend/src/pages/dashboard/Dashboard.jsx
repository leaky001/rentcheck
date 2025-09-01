import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  BarChart3, 
  Calendar,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  PieChart,
  Download,
  Share2,
  Bell,
  Settings,
  Plus
} from "lucide-react";
import OverviewCard from "../../components/dashboard/OverviewCard";
import SpendingChart from "../../components/dashboard/SpendingChart";
import PaymentHistory from "../../components/dashboard/PaymentHistory";
import { useExpenses } from "../../context/ExpensesContext";

const Dashboard = () => {
  const { expenses } = useExpenses();
  const [stats, setStats] = useState({
    totalExpenses: 0,
    monthlyExpenses: 0,
    roommateCount: 3,
    savings: 0,
    budgetRemaining: 0,
    overduePayments: 0
  });

  const [budget, setBudget] = useState({
    monthly: 50000,
    spent: 0,
    remaining: 50000
  });

  const [upcomingBills, setUpcomingBills] = useState([
    { id: 1, title: "Rent", amount: 150000, dueDate: "2024-02-01", category: "Rent", status: "pending" },
    { id: 2, title: "Electricity", amount: 15000, dueDate: "2024-01-25", category: "Utility", status: "overdue" },
    { id: 3, title: "Internet", amount: 8000, dueDate: "2024-01-30", category: "Internet", status: "pending" }
  ]);

  const [roommateStatus, setRoommateStatus] = useState([
    { id: 1, name: "Tosin", avatar: "👨‍💼", paid: 120000, owes: 30000, status: "up-to-date" },
    { id: 2, name: "Kelechi", avatar: "👩‍💼", paid: 70000, owes: 50000, status: "behind" },
    { id: 3, name: "Ada", avatar: "🧕", paid: 150000, owes: 0, status: "up-to-date" }
  ]);

  useEffect(() => {
    // Calculate statistics
    const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    const currentMonth = new Date().getMonth();
    const monthly = expenses
      .filter(expense => new Date(expense.date).getMonth() === currentMonth)
      .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    
    const overdue = upcomingBills.filter(bill => bill.status === "overdue").length;
    
    setStats({
      totalExpenses: total,
      monthlyExpenses: monthly,
      roommateCount: 3,
      savings: 50000 - monthly,
      budgetRemaining: budget.monthly - monthly,
      overduePayments: overdue
    });

    setBudget(prev => ({
      ...prev,
      spent: monthly,
      remaining: prev.monthly - monthly
    }));
  }, [expenses, upcomingBills]);

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

  const quickStats = [
    {
      title: "Total Expenses",
      value: `₦${stats.totalExpenses.toLocaleString()}`,
      icon: <CreditCard className="w-6 h-6" />,
      change: "+12.5%",
      changeType: "increase",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "This Month",
      value: `₦${stats.monthlyExpenses.toLocaleString()}`,
      icon: <Calendar className="w-6 h-6" />,
      change: "+8.2%",
      changeType: "increase",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Budget Remaining",
      value: `₦${stats.budgetRemaining.toLocaleString()}`,
      icon: <Target className="w-6 h-6" />,
      change: stats.budgetRemaining > 0 ? "On Track" : "Over Budget",
      changeType: stats.budgetRemaining > 0 ? "neutral" : "decrease",
      color: stats.budgetRemaining > 0 ? "from-emerald-500 to-emerald-600" : "from-red-500 to-red-600"
    },
    {
      title: "Overdue Bills",
      value: stats.overduePayments.toString(),
      icon: <AlertTriangle className="w-6 h-6" />,
      change: stats.overduePayments > 0 ? "Action Required" : "All Clear",
      changeType: stats.overduePayments > 0 ? "decrease" : "neutral",
      color: stats.overduePayments > 0 ? "from-red-500 to-red-600" : "from-green-500 to-green-600"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "up-to-date": return "text-green-600 bg-green-100";
      case "behind": return "text-red-600 bg-red-100";
      case "pending": return "text-yellow-600 bg-yellow-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "up-to-date": return <CheckCircle className="w-4 h-4" />;
      case "behind": return <AlertTriangle className="w-4 h-4" />;
      case "pending": return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      className="p-6 space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-gray-600">
              Here's what's happening with your shared expenses today
            </p>
          </div>
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Report</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>
              <div className="text-right">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600' : 
                  stat.changeType === 'decrease' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {stat.changeType === 'increase' && <ArrowUpRight className="w-4 h-4 inline" />}
                  {stat.changeType === 'decrease' && <ArrowDownRight className="w-4 h-4 inline" />}
                  {stat.change}
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </h3>
            <p className="text-sm text-gray-600">
              {stat.title}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Budget Overview */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Budget Overview
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Adjust Budget</span>
          </motion.button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-2">
              ₦{budget.monthly.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Monthly Budget</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-2">
              ₦{budget.spent.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Spent This Month</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold mb-2 ${
              budget.remaining > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              ₦{budget.remaining.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Remaining</div>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round((budget.spent / budget.monthly) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${
                (budget.spent / budget.monthly) > 0.8 ? 'bg-red-500' : 
                (budget.spent / budget.monthly) > 0.6 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min((budget.spent / budget.monthly) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </motion.div>

      {/* Upcoming Bills & Roommate Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Bills */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Upcoming Bills
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Bill</span>
            </motion.button>
          </div>
          
          <div className="space-y-4">
            {upcomingBills.map((bill, index) => (
              <motion.div
                key={bill.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    bill.status === 'overdue' ? 'bg-red-500' : 
                    bill.status === 'pending' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{bill.title}</p>
                    <p className="text-sm text-gray-500">{bill.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₦{bill.amount.toLocaleString()}</p>
                  <p className={`text-sm ${
                    bill.status === 'overdue' ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    Due: {new Date(bill.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Roommate Status */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Roommate Status
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>Manage</span>
            </motion.button>
          </div>
          
          <div className="space-y-4">
            {roommateStatus.map((roommate, index) => (
              <motion.div
                key={roommate.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{roommate.avatar}</div>
                  <div>
                    <p className="font-medium text-gray-900">{roommate.name}</p>
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getStatusColor(roommate.status)}`}>
                      {getStatusIcon(roommate.status)}
                      <span className="capitalize">{roommate.status.replace('-', ' ')}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₦{roommate.paid.toLocaleString()}</p>
                  <p className={`text-sm ${roommate.owes > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {roommate.owes > 0 ? `Owes: ₦${roommate.owes.toLocaleString()}` : 'All caught up'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Category Overview */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Expense Categories
          </h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <PieChart className="w-4 h-4" />
            <span>Overview</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {chartData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
                <span className="font-medium text-gray-700">{item.category}</span>
              </div>
              <span className="font-semibold text-gray-900">
                ₦{item.amount.toLocaleString()}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Charts and History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={itemVariants}>
          <SpendingChart data={chartData} />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <PaymentHistory history={expenses} />
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Activity
          </h2>
          <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {expenses.slice(0, 5).map((expense, index) => (
            <motion.div
              key={expense.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{expense.title}</p>
                  <p className="text-sm text-gray-500">{expense.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">₦{expense.amount.toLocaleString()}</p>
                <p className="text-sm text-gray-500">
                  {new Date(expense.date).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
