import express from "express"
import { deleteProduct, getProductsData, uploadProductsData } from "../controllers/products_controller.js"
import { uploadProductImage } from "../middlewares/upload_middleware.js"

const router = express.Router()

router.post('/create_products', uploadProductImage, uploadProductsData)
router.get('/get_products', getProductsData)
router.delete('/delete_product/:id', deleteProduct)

export default router