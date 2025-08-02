import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: Number,
    payer: String,
    method: String,
    date: Date,
  },
  { timestamps: true }
)

export default mongoose.model('Payment', paymentSchema)
