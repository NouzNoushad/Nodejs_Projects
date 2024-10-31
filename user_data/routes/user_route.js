import express from "express"
import { uploadImage } from "../middleware/upload_middleware.js"
import { getUserData, uploadUserData } from "../controllers/user_controller.js"

const router = express.Router()

router.post('/create_user', uploadImage, uploadUserData)
router.get('/get_user', getUserData)

export default router