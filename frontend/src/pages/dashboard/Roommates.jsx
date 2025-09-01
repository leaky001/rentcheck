import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Users, 
  UserPlus, 
  Settings, 
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Star,
  Edit,
  Trash2,
  MoreVertical,
  Filter,
  Search,
  Download,
  Share2,
  PieChart,
  BarChart3
} from "lucide-react";
import AddRoommateForm from "../../components/roommates/AddRoommateForm";
import RoommateCard from "../../components/roommates/RoommateCard";
import ShareDistribution from "../../components/roommates/ShareDistribution";

const Roommates = () => {
  const [roommates, setRoommates] = useState([
    { 
      id: 1, 
      name: "Tosin", 
      share: 30, 
      responsibility: "Pays Rent", 
      avatar: "👨‍💼",
      email: "tosin@email.com",
      phone: "+234 801 234 5678",
      status: "active",
      joinDate: "2023-01-15",
      totalPaid: 450000,
      totalOwed: 0,
      chores: ["Dishes", "Vacuum"],
      paymentHistory: [
        { date: "2024-01-01", amount: 150000, type: "rent" },
        { date: "2024-01-15", amount: 5000, type: "utility" }
      ]
    },
    { 
      id: 2, 
      name: "Kelechi", 
      share: 35, 
      responsibility: "Buys Groceries", 
      avatar: "👩‍💼",
      email: "kelechi@email.com",
      phone: "+234 802 345 6789",
      status: "active",
      joinDate: "2023-02-01",
      totalPaid: 320000,
      totalOwed: 50000,
      chores: ["Trash", "Groceries"],
      paymentHistory: [
        { date: "2024-01-01", amount: 120000, type: "rent" },
        { date: "2024-01-10", amount: 8000, type: "utility" }
      ]
    },
    { 
      id: 3, 
      name: "Ada", 
      share: 35, 
      responsibility: "Manages Utilities", 
      avatar: "🧕",
      email: "ada@email.com",
      phone: "+234 803 456 7890",
      status: "active",
      joinDate: "2023-01-01",
      totalPaid: 480000,
      totalOwed: 0,
      chores: ["Cleaning", "Laundry"],
      paymentHistory: [
        { date: "2024-01-01", amount: 150000, type: "rent" },
        { date: "2024-01-05", amount: 12000, type: "utility" }
      ]
    }
  ]);

  const [chores, setChores] = useState([
    { id: 1, title: "Dishes", assignedTo: "Tosin", frequency: "daily", status: "completed", dueDate: "2024-01-20" },
    { id: 2, title: "Vacuum", assignedTo: "Tosin", frequency: "weekly", status: "pending", dueDate: "2024-01-22" },
    { id: 3, title: "Trash", assignedTo: "Kelechi", frequency: "daily", status: "completed", dueDate: "2024-01-20" },
    { id: 4, title: "Groceries", assignedTo: "Kelechi", frequency: "weekly", status: "in-progress", dueDate: "2024-01-21" },
    { id: 5, title: "Cleaning", assignedTo: "Ada", frequency: "weekly", status: "pending", dueDate: "2024-01-23" },
    { id: 6, title: "Laundry", assignedTo: "Ada", frequency: "bi-weekly", status: "completed", dueDate: "2024-01-19" }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedRoommate, setSelectedRoommate] = useState(null);
  const [viewMode, setViewMode] = useState("cards"); // cards, list, table
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRoommates = roommates.filter(roommate => {
    const matchesStatus = filterStatus === "all" || roommate.status === filterStatus;
    const matchesSearch = roommate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         roommate.responsibility.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalExpenses = roommates.reduce((sum, r) => sum + r.totalPaid, 0);
  const totalOwed = roommates.reduce((sum, r) => sum + r.totalOwed, 0);
  const activeRoommates = roommates.filter(r => r.status === "active").length;

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
      title: "Total Roommates",
      value: roommates.length.toString(),
      icon: <Users className="w-5 h-5" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Active Members",
      value: activeRoommates.toString(),
      icon: <CheckCircle className="w-5 h-5" />,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Total Paid",
      value: `₦${totalExpenses.toLocaleString()}`,
      icon: <DollarSign className="w-5 h-5" />,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Total Owed",
      value: `₦${totalOwed.toLocaleString()}`,
      icon: <AlertTriangle className="w-5 h-5" />,
      color: "from-red-500 to-red-600"
    }
  ];

  const getChoreStatusColor = (status) => {
    switch (status) {
      case "completed": return "text-green-600 bg-green-100";
      case "in-progress": return "text-yellow-600 bg-yellow-100";
      case "pending": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getChoreStatusIcon = (status) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4" />;
      case "in-progress": return <Clock className="w-4 h-4" />;
      case "pending": return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleAddRoommate = (newRoommate) => {
    const newId = roommates.length > 0 ? Math.max(...roommates.map(r => r.id)) + 1 : 1;
    const roommate = {
      ...newRoommate,
      id: newId,
      status: "active",
      joinDate: new Date().toISOString().split('T')[0],
      totalPaid: 0,
      totalOwed: 0,
      chores: [],
      paymentHistory: []
    };
    setRoommates(prev => [...prev, roommate]);
    setShowAddForm(false);
  };

  const handleDeleteRoommate = (id) => {
    setRoommates(prev => prev.filter(r => r.id !== id));
  };

  const handleResponsibilityChange = (id, newResponsibility) => {
    setRoommates(prev =>
      prev.map(roommate =>
        roommate.id === id ? { ...roommate, responsibility: newResponsibility } : roommate
      )
    );
  };

  const handleChoreStatusChange = (choreId, newStatus) => {
    setChores(prev =>
      prev.map(chore =>
        chore.id === choreId ? { ...chore, status: newStatus } : chore
      )
    );
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
            Roommate Management
          </h1>
          <p className="text-gray-600">
            Manage your roommates, track payments, and coordinate household responsibilities
          </p>
        </div>
        
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode(viewMode === "cards" ? "list" : "cards")}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {viewMode === "cards" ? <BarChart3 className="w-5 h-5" /> : <Users className="w-5 h-5" />}
            <span>{viewMode === "cards" ? "List View" : "Card View"}</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all flex items-center space-x-2 shadow-lg"
          >
            <UserPlus className="w-5 h-5" />
            <span>Add Roommate</span>
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

      {/* Search and Filters */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search roommates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          
          {/* Status Filter */}
          <div className="lg:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Add Roommate Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <AddRoommateForm 
              onAdd={handleAddRoommate}
              onClose={() => setShowAddForm(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Roommates Section */}
      <motion.div variants={itemVariants} className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Roommates ({filteredRoommates.length})
          </h2>
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

        {viewMode === "cards" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoommates.map((roommate, index) => (
              <motion.div
                key={roommate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <RoommateCard
                  roommate={roommate}
                  onDelete={handleDeleteRoommate}
                  onResponsibilityChange={handleResponsibilityChange}
                  onSelect={() => setSelectedRoommate(roommate)}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Roommate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Share
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Responsibility
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Paid
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRoommates.map((roommate) => (
                    <tr key={roommate.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-2xl mr-3">{roommate.avatar}</div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{roommate.name}</div>
                            <div className="text-sm text-gray-500">{roommate.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{roommate.share}%</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{roommate.responsibility}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          roommate.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {roommate.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">₦{roommate.totalPaid.toLocaleString()}</div>
                        {roommate.totalOwed > 0 && (
                          <div className="text-sm text-red-600">Owes: ₦{roommate.totalOwed.toLocaleString()}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-purple-600 hover:text-purple-900">Edit</button>
                          <button 
                            onClick={() => handleDeleteRoommate(roommate.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>

      {/* Chores Management */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Household Chores
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Chore</span>
          </motion.button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chores.map((chore, index) => (
            <motion.div
              key={chore.id}
              whileHover={{ y: -2 }}
              className="p-4 bg-gray-50 rounded-lg border-l-4 border-green-500 hover:bg-gray-100 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">{chore.title}</h3>
                <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getChoreStatusColor(chore.status)}`}>
                  {getChoreStatusIcon(chore.status)}
                  <span className="capitalize">{chore.status.replace('-', ' ')}</span>
                </div>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                Assigned to: {chore.assignedTo}
              </div>
              <div className="text-sm text-gray-500 mb-3">
                Due: {new Date(chore.dueDate).toLocaleDateString()}
              </div>
              <div className="flex space-x-2">
                <select
                  value={chore.status}
                  onChange={(e) => handleChoreStatusChange(chore.id, e.target.value)}
                  className="text-xs px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-purple-500"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Share Distribution */}
      <motion.div variants={itemVariants}>
        <ShareDistribution roommates={roommates} />
      </motion.div>
    </motion.div>
  );
};

export default Roommates;
