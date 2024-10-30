import express from "express"
import { logout, signIn, signUp } from "../controllers/auth_controller.js"
import { authVerify } from "../middleware/auth_verify.js"

const router = express.Router()

router.post('/sign_up', signUp)
router.post('/sign_in', signIn)
router.get('/logout', authVerify, logout)


export default router