import Expense from '../models/Expense.js'

export const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ user: req.user._id })
  res.json(expenses)
}

export const addExpense = async (req, res) => {
  const { title, amount, category, date, payer, sharedWith } = req.body

  const expense = await Expense.create({
    user: req.user._id,
    title,
    amount,
    category,
    date,
    payer,
    sharedWith,
  })

  res.status(201).json(expense)
}
