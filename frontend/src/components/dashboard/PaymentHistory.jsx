import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  DollarSign,
  Filter,
  Search,
  Download,
  Eye,
  EyeOff,
  Calendar,
  CreditCard,
  Building,
  Coins,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  Edit,
  Trash2,
  Share2,
  Receipt,
  User,
  Tag
} from "lucide-react";

const PaymentHistory = ({ history = [] }) => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Enhanced payment data with more details
  const paymentData = [
    {
      id: 1,
      title: "Rent Payment",
      amount: 150000,
      type: "rent",
      status: "completed",
      date: "2024-01-01",
      method: "bank_transfer",
      payer: "Tosin",
      category: "Rent",
      description: "Monthly rent payment for January 2024",
      receipt: "receipt_001.pdf",
      roommates: ["Tosin", "Kelechi", "Ada"],
      splitAmount: 50000,
      notes: "On time payment"
    },
    {
      id: 2,
      title: "Electricity Bill",
      amount: 15000,
      type: "utility",
      status: "pending",
      date: "2024-01-15",
      method: "mobile_money",
      payer: "Ada",
      category: "Utility",
      description: "December electricity bill",
      receipt: "receipt_002.pdf",
      roommates: ["Tosin", "Kelechi", "Ada"],
      splitAmount: 5000,
      notes: "Due by January 25th"
    },
    {
      id: 3,
      title: "Internet Bill",
      amount: 8000,
      type: "internet",
      status: "completed",
      date: "2024-01-10",
      method: "credit_card",
      payer: "Kelechi",
      category: "Internet",
      description: "Monthly internet subscription",
      receipt: "receipt_003.pdf",
      roommates: ["Tosin", "Kelechi", "Ada"],
      splitAmount: 2667,
      notes: "Auto-renewal"
    },
    {
      id: 4,
      title: "Groceries",
      amount: 12000,
      type: "grocery",
      status: "completed",
      date: "2024-01-12",
      method: "cash",
      payer: "Kelechi",
      category: "Grocery",
      description: "Weekly grocery shopping",
      receipt: "receipt_004.pdf",
      roommates: ["Tosin", "Kelechi", "Ada"],
      splitAmount: 4000,
      notes: "Shared household items"
    },
    {
      id: 5,
      title: "Cleaning Service",
      amount: 5000,
      type: "cleaning",
      status: "overdue",
      date: "2024-01-05",
      method: "bank_transfer",
      payer: "Tosin",
      category: "Cleaning",
      description: "Weekly cleaning service",
      receipt: "receipt_005.pdf",
      roommates: ["Tosin", "Kelechi", "Ada"],
      splitAmount: 1667,
      notes: "Payment overdue - need to follow up"
    }
  ];

  const paymentMethods = {
    bank_transfer: { label: "Bank Transfer", icon: <Building className="w-4 h-4" />, color: "text-blue-600" },
    mobile_money: { label: "Mobile Money", icon: <CreditCard className="w-4 h-4" />, color: "text-green-600" },
    credit_card: { label: "Credit Card", icon: <CreditCard className="w-4 h-4" />, color: "text-purple-600" },
    cash: { label: "Cash", icon: <Coins className="w-4 h-4" />, color: "text-orange-600" }
  };

  const paymentTypes = [
    { value: "all", label: "All Types" },
    { value: "rent", label: "Rent" },
    { value: "utility", label: "Utility" },
    { value: "internet", label: "Internet" },
    { value: "grocery", label: "Grocery" },
    { value: "cleaning", label: "Cleaning" },
    { value: "misc", label: "Miscellaneous" }
  ];

  const statuses = [
    { value: "all", label: "All Status" },
    { value: "completed", label: "Completed" },
    { value: "pending", label: "Pending" },
    { value: "overdue", label: "Overdue" }
  ];

  const filteredPayments = useMemo(() => {
    return paymentData.filter(payment => {
      const matchesStatus = filterStatus === "all" || payment.status === filterStatus;
      const matchesType = filterType === "all" || payment.type === filterType;
      const matchesSearch = payment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           payment.payer.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesType && matchesSearch;
    });
  }, [filterStatus, filterType, searchTerm]);

  const sortedPayments = useMemo(() => {
    return [...filteredPayments].sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case "date":
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case "amount":
          aValue = a.amount;
          bValue = b.amount;
          break;
        case "status":
          aValue = a.status;
          bValue = b.status;
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
  }, [filteredPayments, sortBy, sortOrder]);

  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const completedAmount = filteredPayments.filter(p => p.status === "completed").reduce((sum, payment) => sum + payment.amount, 0);
  const pendingAmount = filteredPayments.filter(p => p.status === "pending").reduce((sum, payment) => sum + payment.amount, 0);
  const overdueAmount = filteredPayments.filter(p => p.status === "overdue").reduce((sum, payment) => sum + payment.amount, 0);

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending": return <Clock className="w-4 h-4 text-yellow-500" />;
      case "overdue": return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "text-green-600 bg-green-100";
      case "pending": return "text-yellow-600 bg-yellow-100";
      case "overdue": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed": return "text-green-800 bg-green-100 border-green-200";
      case "pending": return "text-yellow-800 bg-yellow-100 border-yellow-200";
      case "overdue": return "text-red-800 bg-red-100 border-red-200";
      default: return "text-gray-800 bg-gray-100 border-gray-200";
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
          <h2 className="text-xl font-semibold text-gray-900">Payment History</h2>
          <p className="text-sm text-gray-600">Track all your shared payments and expenses</p>
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

      {/* Payment Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Total</p>
              <p className="text-lg font-bold text-green-800">₦{totalAmount.toLocaleString()}</p>
            </div>
            <DollarSign className="w-6 h-6 text-green-500" />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">Completed</p>
              <p className="text-lg font-bold text-blue-800">₦{completedAmount.toLocaleString()}</p>
            </div>
            <CheckCircle className="w-6 h-6 text-blue-500" />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-lg border border-yellow-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600">Pending</p>
              <p className="text-lg font-bold text-yellow-800">₦{pendingAmount.toLocaleString()}</p>
            </div>
            <Clock className="w-6 h-6 text-yellow-500" />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg border border-red-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600">Overdue</p>
              <p className="text-lg font-bold text-red-800">₦{overdueAmount.toLocaleString()}</p>
            </div>
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <div className="space-y-4 mb-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          >
            {statuses.map(status => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          >
            {paymentTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
            <option value="status">Sort by Status</option>
          </select>

          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            {sortOrder === "asc" ? "↑ Ascending" : "↓ Descending"}
          </button>
        </div>
      </div>

      {/* Payment List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Payments ({filteredPayments.length})
          </h3>
          <div className="text-sm text-gray-500">
            Showing {filteredPayments.length} of {paymentData.length} payments
          </div>
        </div>

        <AnimatePresence>
          {sortedPayments.map((payment, index) => (
            <motion.div
              key={payment.id}
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 hover:shadow-sm transition-all cursor-pointer"
              onClick={() => setSelectedPayment(selectedPayment === payment.id ? null : payment.id)}
            >
              {/* Payment Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    payment.status === "completed" ? "bg-green-100" :
                    payment.status === "pending" ? "bg-yellow-100" : "bg-red-100"
                  }`}>
                    {getStatusIcon(payment.status)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{payment.title}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{payment.payer}</span>
                      <span>•</span>
                      <span>{new Date(payment.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">₦{payment.amount.toLocaleString()}</div>
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs border ${getStatusBadge(payment.status)}`}>
                    {getStatusIcon(payment.status)}
                    <span className="capitalize">{payment.status}</span>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Category:</span>
                  <div className="font-medium text-gray-900">{payment.category}</div>
                </div>
                <div>
                  <span className="text-gray-500">Method:</span>
                  <div className="flex items-center space-x-1">
                    {paymentMethods[payment.method]?.icon}
                    <span className="font-medium text-gray-900">{paymentMethods[payment.method]?.label}</span>
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Split Amount:</span>
                  <div className="font-medium text-gray-900">₦{payment.splitAmount.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-gray-500">Roommates:</span>
                  <div className="font-medium text-gray-900">{payment.roommates.length}</div>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedPayment === payment.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-gray-200 space-y-3"
                >
                  <div>
                    <span className="text-gray-500 text-sm">Description:</span>
                    <p className="text-gray-900">{payment.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-gray-500 text-sm">Receipt:</span>
                      <div className="flex items-center space-x-2">
                        <Receipt className="w-4 h-4 text-gray-400" />
                        <span className="text-blue-600 hover:underline cursor-pointer">{payment.receipt}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Notes:</span>
                      <p className="text-gray-900">{payment.notes}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Roommates:</span>
                      <div className="flex flex-wrap gap-1">
                        {payment.roommates.map((roommate, idx) => (
                          <span key={idx} className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            <User className="w-3 h-3 mr-1" />
                            {roommate}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center space-x-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center space-x-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredPayments.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
          >
            <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
            <p className="text-gray-500">
              {searchTerm || filterStatus !== "all" || filterType !== "all"
                ? "Try adjusting your search or filters"
                : "No payment history available yet"
              }
            </p>
          </motion.div>
        )}
      </div>

      {/* Payment Insights */}
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-6 pt-6 border-t border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">💡 Payment Patterns</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Most payments are made in the first week of the month</li>
                <li>• Bank transfers are the preferred payment method</li>
                <li>• Rent payments are consistently on time</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">📊 Quick Stats</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Average payment amount: ₦{(totalAmount / filteredPayments.length).toFixed(0)}</li>
                <li>• Payment success rate: {Math.round((completedAmount / totalAmount) * 100)}%</li>
                <li>• Total pending amount: ₦{pendingAmount.toLocaleString()}</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PaymentHistory;
