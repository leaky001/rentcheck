import React, { createContext, useContext, useEffect, useState } from "react";

const ExpensesContext = createContext();

const LOCAL_STORAGE_KEY = "roomie_expenses";

export const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState({ category: "", search: "" });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (stored) setExpenses(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory =
      !filter.category || expense.category === filter.category;
    const matchesSearch = expense.title
      .toLowerCase()
      .includes(filter.search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <ExpensesContext.Provider
      value={{
        expenses: filteredExpenses,
        addExpense,
        deleteExpense,
        filter,
        setFilter,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpensesContext);
