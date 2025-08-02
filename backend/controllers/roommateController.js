import Roommate from '../models/Roommate.js'

export const getRoommates = async (req, res) => {
  const roommates = await Roommate.find({ user: req.user._id })
  res.json(roommates)
}

export const addRoommate = async (req, res) => {
  const { name, contact, sharePercent } = req.body

  const roommate = await Roommate.create({
    user: req.user._id,
    name,
    contact,
    sharePercent,
  })

  res.status(201).json(roommate)
}

export const removeRoommate = async (req, res) => {
  await Roommate.findByIdAndDelete(req.params.id)
  res.json({ message: 'Roommate removed' })
}
