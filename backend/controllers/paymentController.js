import Payment from '../models/Payment.js'

export const getPayments = async (req, res) => {
  const payments = await Payment.find({ user: req.user._id })
  res.json(payments)
}

export const logPayment = async (req, res) => {
  const { amount, payer, method, date } = req.body

  const payment = await Payment.create({
    user: req.user._id,
    amount,
    payer,
    method,
    date,
  })

  res.status(201).json(payment)
}
