import React, { useState } from "react";
import { motion } from "framer-motion";
import AddRoommateForm from "../../components/roommates/AddRoommateForm";
import RoommateCard from "../../components/roommates/RoommateCard";
import ShareDistribution from "../../components/roommates/ShareDistribution";

const Roommates = () => {
  const [roommates, setRoommates] = useState([
    { id: 1, name: "Tosin", share: 30, responsibility: "Pays Rent" },
    { id: 2, name: "Kelechi", share: 35, responsibility: "Buys Groceries" },
  ]);

  const handleAddRoommate = (newRoommate) => {
    const newId = roommates.length > 0 ? roommates[roommates.length - 1].id + 1 : 1;
    setRoommates((prev) => [...prev, { ...newRoommate, id: newId, share: 0, responsibility: "" }]);
  };

  const handleDeleteRoommate = (id) => {
    setRoommates((prev) => prev.filter((r) => r.id !== id));
  };

  const handleResponsibilityChange = (id, newResponsibility) => {
    setRoommates((prev) =>
      prev.map((roommate) =>
        roommate.id === id ? { ...roommate, responsibility: newResponsibility } : roommate
      )
    );
  };

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Roommate Manager</h2>

      <AddRoommateForm onAdd={handleAddRoommate} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {roommates.map((roommate) => (
          <RoommateCard
            key={roommate.id}
            roommate={roommate}
            onDelete={handleDeleteRoommate}
            onResponsibilityChange={handleResponsibilityChange}
          />
        ))}
      </div>

      <ShareDistribution roommates={roommates} />
    </motion.div>
  );
};

export default Roommates;
