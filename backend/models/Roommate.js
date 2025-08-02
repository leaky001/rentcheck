import mongoose from 'mongoose'

const roommateSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    contact: String,
    sharePercent: Number,
  },
  { timestamps: true }
)

export default mongoose.model('Roommate', roommateSchema)
