import express from 'express'
import { showMessage } from '../controllers/authController.js'
const router = express.Router()




router.get('/auth', showMessage)


export default router