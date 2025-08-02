import express from 'express'
import { getPayments, logPayment } from '../controllers/paymentController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(protect, getPayments).post(protect, logPayment)

export default router
