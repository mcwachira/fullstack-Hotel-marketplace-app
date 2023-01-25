import express from 'express'
import { createConnectAccount, getAccountStatus, getAccountBalance, payoutSetting } from '../controllers/stripeController.js'
import { requireSignIn } from '../middleware/requireSignIn.js'
const router = express.Router()

router.post('/create-connect-account', requireSignIn, createConnectAccount)
router.post('/get-account-status', requireSignIn, getAccountStatus)
router.post('/get-account-balance', requireSignIn, getAccountBalance)
router.post('/payout-setting', requireSignIn, payoutSetting)





export default router