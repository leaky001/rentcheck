import React from "react";
import { motion } from "framer-motion";

const Settings = () => {
  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2">Notification Preferences</h3>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" />
            Enable rent reminders
          </label>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2">Theme</h3>
          <button className="px-4 py-2 bg-violet-600 text-white rounded-xl">Toggle Dark Mode</button>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
