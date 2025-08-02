import React from "react";
import { motion } from "framer-motion";
import FilterBar from "../../components/expenses/FilterBar";
import ExpenseForm from "../../components/expenses/ExpenseForm";
import ExpenseItem from "../../components/expenses/ExpenseItem";
import { useExpenses } from "../../context/ExpensesContext";

const Expenses = () => {
  const { expenses, addExpense, deleteExpense, filter, setFilter } =
    useExpenses();

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Manage Expenses</h2>
      <FilterBar filter={filter} onFilterChange={setFilter} />
      <ExpenseForm onAdd={addExpense} />
      <div className="mt-6 space-y-4">
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onDelete={deleteExpense}
            />
          ))
        ) : (
          <p className="text-gray-500">No expenses found.</p>
        )}
      </div>
    </motion.div>
  );
};

export default Expenses;
