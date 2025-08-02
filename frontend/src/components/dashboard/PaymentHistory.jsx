import React from "react";

const PaymentHistory = ({ history }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mt-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Payments</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead>
            <tr className="bg-[#FBF0FF] text-[#631499]">
              <th className="p-3">Date</th>
              <th className="p-3">Category</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Paid By</th>
            </tr>
          </thead>
          <tbody>
            {history?.length > 0 ? (
              history.map((item, i) => (
                <tr key={i} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3">{item.date}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">₦{item.amount}</td>
                  <td className="p-3">{item.paidBy}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-400">
                  No payment history available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
