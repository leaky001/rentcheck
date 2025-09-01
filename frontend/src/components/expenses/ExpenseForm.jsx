import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { 
  X, 
  Plus, 
  DollarSign, 
  Tag, 
  Calendar, 
  Repeat,
  Split,
  Upload,
  Camera,
  Users,
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  ImageIcon
} from "lucide-react";
import { useExpenses } from "../../context/ExpensesContext";

const ExpenseForm = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
    date: new Date().toISOString().split('T')[0],
    isRecurring: false,
    frequency: "monthly",
    splitWith: [],
    attachments: []
  });
  const [errors, setErrors] = useState({});
  const [isRecurring, setIsRecurring] = useState(false);
  const [showSplitOptions, setShowSplitOptions] = useState(false);

  const categories = [
    { value: "Rent", label: "🏠 Rent", color: "bg-blue-100 text-blue-800" },
    { value: "Utility", label: "⚡ Utility", color: "bg-green-100 text-green-800" },
    { value: "Grocery", label: "🛒 Grocery", color: "bg-yellow-100 text-yellow-800" },
    { value: "Internet", label: "🌐 Internet", color: "bg-purple-100 text-purple-800" },
    { value: "Cleaning", label: "🧹 Cleaning", color: "bg-pink-100 text-pink-800" },
    { value: "Transport", label: "🚗 Transport", color: "bg-indigo-100 text-indigo-800" },
    { value: "Entertainment", label: "🎬 Entertainment", color: "bg-orange-100 text-orange-800" },
    { value: "Misc", label: "📦 Miscellaneous", color: "bg-gray-100 text-gray-800" }
  ];

  const frequencies = [
    { value: "weekly", label: "Weekly" },
    { value: "bi-weekly", label: "Bi-weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "yearly", label: "Yearly" }
  ];

  const roommates = [
    { id: 1, name: "Tosin", avatar: "👨‍💼" },
    { id: 2, name: "Kelechi", avatar: "👩‍💼" },
    { id: 3, name: "Ada", avatar: "🧕" }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (formData.isRecurring && !formData.frequency) {
      newErrors.frequency = "Frequency is required for recurring expenses";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type,
      size: file.size,
      file: file
    }));
    
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments]
    }));
  };

  const removeAttachment = (id) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter(att => att.id !== id)
    }));
  };

  const toggleRoommateSplit = (roommateId) => {
    setFormData(prev => ({
      ...prev,
      splitWith: prev.splitWith.includes(roommateId)
        ? prev.splitWith.filter(id => id !== roommateId)
        : [...prev.splitWith, roommateId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const expense = {
      ...formData,
      id: Date.now(),
      amount: parseFloat(formData.amount),
      date: new Date(formData.date).toISOString(),
      createdAt: new Date().toISOString(),
      splitWith: formData.splitWith,
      isRecurring: formData.isRecurring,
      frequency: formData.isRecurring ? formData.frequency : null
    };

    onAdd(expense);
    
    // Reset form
    setFormData({
      title: "",
      amount: "",
      category: "",
      description: "",
      date: new Date().toISOString().split('T')[0],
      isRecurring: false,
      frequency: "monthly",
      splitWith: [],
      attachments: []
    });
    setErrors({});
    setIsRecurring(false);
    setShowSplitOptions(false);
    
    toast.success("Expense added successfully!");
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Add New Expense</h3>
              <p className="text-purple-100 text-sm">Track your household spending</p>
            </div>
          </div>
          {onClose && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Title Field */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Expense Title
          </label>
          <div className="relative">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g. Electricity bill, Groceries"
            />
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          {errors.title && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1 flex items-center space-x-1"
            >
              <AlertCircle className="w-4 h-4" />
              <span>{errors.title}</span>
            </motion.p>
          )}
        </motion.div>

        {/* Amount Field */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Amount (₦)
          </label>
          <div className="relative">
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              min="0"
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                errors.amount ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0.00"
            />
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          {errors.amount && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1 flex items-center space-x-1"
            >
              <AlertCircle className="w-4 h-4" />
              <span>{errors.amount}</span>
            </motion.p>
          )}
        </motion.div>

        {/* Category Field */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.value}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setFormData({ ...formData, category: category.value });
                  if (errors.category) {
                    setErrors({ ...errors, category: "" });
                  }
                }}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.category === category.value
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`text-sm font-medium ${category.color}`}>
                  {category.label}
                </div>
              </motion.button>
            ))}
          </div>
          {errors.category && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1 flex items-center space-x-1"
            >
              <AlertCircle className="w-4 h-4" />
              <span>{errors.category}</span>
            </motion.p>
          )}
        </motion.div>

        {/* Date Field */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Date
          </label>
          <div className="relative">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </motion.div>

        {/* Recurring Expense Toggle */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isRecurring"
              checked={isRecurring}
              onChange={(e) => {
                setIsRecurring(e.target.checked);
                setFormData({ ...formData, isRecurring: e.target.checked });
              }}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label htmlFor="isRecurring" className="text-sm font-medium text-gray-700">
              This is a recurring expense
            </label>
          </div>
          
          {isRecurring && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4"
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Frequency
              </label>
              <select
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {frequencies.map((freq) => (
                  <option key={freq.value} value={freq.value}>
                    {freq.label}
                  </option>
                ))}
              </select>
            </motion.div>
          )}
        </motion.div>

        {/* Expense Splitting */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center space-x-3 mb-3">
            <input
              type="checkbox"
              id="showSplitOptions"
              checked={showSplitOptions}
              onChange={(e) => setShowSplitOptions(e.target.checked)}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label htmlFor="showSplitOptions" className="text-sm font-medium text-gray-700">
              Split this expense with roommates
            </label>
          </div>
          
          {showSplitOptions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 p-4 bg-gray-50 rounded-lg"
            >
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select roommates to split with:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {roommates.map((roommate) => (
                  <motion.button
                    key={roommate.id}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleRoommateSplit(roommate.id)}
                    className={`p-3 rounded-lg border-2 transition-all flex items-center space-x-2 ${
                      formData.splitWith.includes(roommate.id)
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-lg">{roommate.avatar}</span>
                    <span className="text-sm font-medium text-gray-700">{roommate.name}</span>
                    {formData.splitWith.includes(roommate.id) && (
                      <CheckCircle className="w-4 h-4 text-purple-600" />
                    )}
                  </motion.button>
                ))}
              </div>
              {formData.splitWith.length > 0 && (
                <div className="mt-3 text-sm text-gray-600">
                  Split amount per person: ₦{(formData.amount / (formData.splitWith.length + 1)).toFixed(2)}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Attachments */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Attachments (Optional)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              accept="image/*,.pdf,.doc,.docx"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="flex flex-col items-center space-y-2">
                <Upload className="w-8 h-8 text-gray-400" />
                <div>
                  <span className="text-sm font-medium text-purple-600 hover:text-purple-500">
                    Upload files
                  </span>
                  <span className="text-gray-500"> or drag and drop</span>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, PDF up to 10MB
                </p>
              </div>
            </label>
          </div>
          
          {formData.attachments.length > 0 && (
            <div className="mt-3 space-y-2">
              {formData.attachments.map((attachment) => (
                <div key={attachment.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{attachment.name}</span>
                    <span className="text-xs text-gray-500">
                      ({(attachment.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAttachment(attachment.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Description Field */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description (Optional)
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
            placeholder="Add any additional details about this expense..."
          />
        </motion.div>

        {/* Submit Button */}
        <motion.button
          variants={itemVariants}
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Add Expense</span>
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ExpenseForm;
