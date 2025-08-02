import express from 'express'
import { addRoommate, getRoommates, removeRoommate } from '../controllers/roommateController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(protect, getRoommates).post(protect, addRoommate)
router.delete('/:id', protect, removeRoommate)

export default router
