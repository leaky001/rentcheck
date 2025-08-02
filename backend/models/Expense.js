import mongoose from 'mongoose'

const expenseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    amount: Number,
    category: String,
    date: Date,
    payer: String,
    sharedWith: [String],
  },
  { timestamps: true }
)

export default mongoose.model('Expense', expenseSchema)
