import React, { createContext, useContext, useState } from "react";

const RoommateContext = createContext();

export const useRoommates = () => useContext(RoommateContext);

export const RoommateProvider = ({ children }) => {
  const [roommates, setRoommates] = useState([
    {
      id: 1,
      name: "Ada",
      avatar: "🧕",
      mood: "🙂",
      chores: ["Dishes", "Vacuum"],
      paid: 12000,
      owes: 3000,
    },
    {
      id: 2,
      name: "Tunde",
      avatar: "👨🏽",
      mood: "😅",
      chores: ["Trash", "Groceries"],
      paid: 7000,
      owes: 5000,
    },
  ]);

  return (
    <RoommateContext.Provider value={{ roommates, setRoommates }}>
      {children}
    </RoommateContext.Provider>
  );
};
