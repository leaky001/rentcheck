import React from "react";

const ShareDistribution = ({ roommates = [], total = 0 }) => {
  const share = roommates.length ? (total / roommates.length).toFixed(2) : 0;

  return (
    <div className="mt-4 bg-indigo-50 p-4 rounded">
      <h3 className="text-lg font-semibold mb-2">Expense Distribution</h3>
      {roommates.length === 0 ? (
        <p className="text-gray-600">No roommates to share expenses with.</p>
      ) : (
        <ul className="list-disc ml-5 space-y-1 text-gray-800">
          {roommates.map((r) => (
            <li key={r.id}>
              {r.name} owes <span className="font-bold text-indigo-700">₦{share}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShareDistribution;
