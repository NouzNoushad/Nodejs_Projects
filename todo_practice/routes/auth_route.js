import express from "express"
import { signIn, signUp } from "../controllers/auth_controller.js"

const router = express.Router()

router.post('/sign_up', signUp)
router.post('/sign_in', signIn)


export default router