import React from "react";

const ExpenseShare = ({ paid, owes }) => {
  return (
    <div className="mt-3">
      <h4 className="font-semibold mb-1">Expenses</h4>
      <p className="text-sm text-green-600">Paid: ₦{paid.toLocaleString()}</p>
      <p className="text-sm text-red-500">Owes: ₦{owes.toLocaleString()}</p>
    </div>
  );
};

export default ExpenseShare;
