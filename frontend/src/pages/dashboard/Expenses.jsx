import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Filter, 
  Search, 
  TrendingUp, 
  Calendar,
  Repeat,
  Split,
  Download,
  Share2,
  PieChart,
  BarChart3,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Edit,
  Trash2,
  Eye,
  MoreVertical
} from "lucide-react";
import FilterBar from "../../components/expenses/FilterBar";
import ExpenseForm from "../../components/expenses/ExpenseForm";
import ExpenseItem from "../../components/expenses/ExpenseItem";
import { useExpenses } from "../../context/ExpensesContext";

const Expenses = () => {
  const { expenses, addExpense, deleteExpense, filter, setFilter } = useExpenses();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // list, grid, chart
  const [sortBy, setSortBy] = useState("date"); // date, amount, category
  const [sortOrder, setSortOrder] = useState("desc"); // asc, desc

  const [recurringExpenses, setRecurringExpenses] = useState([
    { id: 1, title: "Rent", amount: 150000, frequency: "monthly", nextDue: "2024-02-01", category: "Rent" },
    { id: 2, title: "Internet", amount: 8000, frequency: "monthly", nextDue: "2024-01-30", category: "Internet" },
    { id: 3, title: "Cleaning Service", amount: 5000, frequency: "weekly", nextDue: "2024-01-28", category: "Cleaning" }
  ]);

  const [expenseCategories, setExpenseCategories] = useState([
    { name: "Rent", icon: "🏠", color: "bg-blue-100 text-blue-800", total: 0 },
    { name: "Utility", icon: "⚡", color: "bg-green-100 text-green-800", total: 0 },
    { name: "Grocery", icon: "🛒", color: "bg-yellow-100 text-yellow-800", total: 0 },
    { name: "Internet", icon: "🌐", color: "bg-purple-100 text-purple-800", total: 0 },
    { name: "Cleaning", icon: "🧹", color: "bg-pink-100 text-pink-800", total: 0 },
    { name: "Misc", icon: "📦", color: "bg-gray-100 text-gray-800", total: 0 }
  ]);

  useEffect(() => {
    // Calculate category totals
    const categoryTotals = expenses.reduce((acc, expense) => {
      const category = expense.category || "Misc";
      acc[category] = (acc[category] || 0) + parseFloat(expense.amount);
      return acc;
    }, {});

    setExpenseCategories(prev => prev.map(cat => ({
      ...cat,
      total: categoryTotals[cat.name] || 0
    })));
  }, [expenses]);

  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory = !filter.category || expense.category === filter.category;
    const matchesSearch = expense.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case "date":
        aValue = new Date(a.date);
        bValue = new Date(b.date);
        break;
      case "amount":
        aValue = parseFloat(a.amount);
        bValue = parseFloat(b.amount);
        break;
      case "category":
        aValue = a.category || "";
        bValue = b.category || "";
        break;
      default:
        aValue = new Date(a.date);
        bValue = new Date(b.date);
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  const averageAmount = filteredExpenses.length > 0 ? totalAmount / filteredExpenses.length : 0;
  const monthlyTotal = expenses
    .filter(expense => new Date(expense.date).getMonth() === new Date().getMonth())
    .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

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

  const stats = [
    {
      title: "Total Expenses",
      value: `₦${totalAmount.toLocaleString()}`,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "This Month",
      value: `₦${monthlyTotal.toLocaleString()}`,
      icon: <Calendar className="w-5 h-5" />,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Average Amount",
      value: `₦${averageAmount.toLocaleString()}`,
      icon: <DollarSign className="w-5 h-5" />,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Total Items",
      value: filteredExpenses.length.toString(),
      icon: <BarChart3 className="w-5 h-5" />,
      color: "from-orange-500 to-orange-600"
    }
  ];

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return null;
    return sortOrder === "asc" ? "↑" : "↓";
  };

  return (
    <motion.div
      className="p-6 space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Expense Management
          </h1>
          <p className="text-gray-600">
            Track and manage all your shared household expenses
          </p>
        </div>
        
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {viewMode === "list" ? <BarChart3 className="w-5 h-5" /> : <BarChart3 className="w-5 h-5" />}
            <span>{viewMode === "list" ? "Grid View" : "List View"}</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all flex items-center space-x-2 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Add Expense</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Category Overview */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Expense Categories
          </h2>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <PieChart className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <BarChart3 className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {expenseCategories.map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -2 }}
              className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="text-sm font-medium text-gray-700 mb-1">{category.name}</div>
              <div className="text-lg font-bold text-gray-900">₦{category.total.toLocaleString()}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recurring Expenses */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Recurring Expenses
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            <Repeat className="w-4 h-4" />
            <span>Add Recurring</span>
          </motion.button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recurringExpenses.map((expense, index) => (
            <motion.div
              key={expense.id}
              whileHover={{ y: -2 }}
              className="p-4 bg-gray-50 rounded-lg border-l-4 border-green-500 hover:bg-gray-100 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">{expense.title}</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {expense.frequency}
                </span>
              </div>
              <div className="text-lg font-bold text-gray-900 mb-1">
                ₦{expense.amount.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">
                Next due: {new Date(expense.nextDue).toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          
          {/* Filters */}
          <div className="lg:w-80">
            <FilterBar filter={filter} onFilterChange={setFilter} />
          </div>
        </div>

        {/* Sort Options */}
        <div className="mt-4 flex items-center space-x-4">
          <span className="text-sm text-gray-600">Sort by:</span>
          <div className="flex space-x-2">
            {[
              { key: "date", label: "Date" },
              { key: "amount", label: "Amount" },
              { key: "category", label: "Category" }
            ].map((option) => (
              <button
                key={option.key}
                onClick={() => handleSort(option.key)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  sortBy === option.key
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {option.label} {getSortIcon(option.key)}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Add Expense Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <ExpenseForm 
              onAdd={(expense) => {
                addExpense(expense);
                setShowForm(false);
              }} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expenses List */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            All Expenses ({filteredExpenses.length})
          </h2>
          <div className="flex items-center space-x-4">
            {filteredExpenses.length > 0 && (
              <div className="text-sm text-gray-500">
                Total: ₦{totalAmount.toLocaleString()}
              </div>
            )}
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Export"
              >
                <Download className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Share"
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {filteredExpenses.length > 0 ? (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
            <AnimatePresence>
              {sortedExpenses.map((expense, index) => (
                <motion.div
                  key={expense.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ExpenseItem
                    expense={expense}
                    onDelete={deleteExpense}
                    viewMode={viewMode}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300"
          >
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No expenses found
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || filter.category 
                ? "Try adjusting your search or filters"
                : "Get started by adding your first expense"
              }
            </p>
            {!searchTerm && !filter.category && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(true)}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Add First Expense
              </motion.button>
            )}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Expenses;
