import React from "react";
import { motion } from "framer-motion";

const ChoreList = ({ chores }) => {
  return (
    <div className="mt-2">
      <h4 className="font-semibold mb-1">Chores</h4>
      <ul className="list-disc list-inside text-sm">
        {chores.map((chore, idx) => (
          <motion.li key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            ✅ {chore}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default ChoreList;
