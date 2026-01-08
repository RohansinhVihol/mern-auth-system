import {Router} from 'express'
import { isAuthenticated, login, logout, register, resetPassword, sendPassResetOtp, sendVerifyOtp, verifyEmail } from '../controllers/auth.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/send-verify-otp').post(verifyJWT,sendVerifyOtp)
router.route('/verify-account').post(verifyJWT,verifyEmail)
router.route('/is-auth').post(verifyJWT,isAuthenticated)
router.route('/send-reset-otp').post(sendPassResetOtp)
router.route('/reset-password').post(resetPassword)


export default router