import express from "express"
import { uploadImage } from "../middleware/upload_middleware.js"
import { uploadUserData } from "../controllers/user_controller.js"

const router = express.Router()

router.post('/create_user', uploadImage, uploadUserData)

export default router