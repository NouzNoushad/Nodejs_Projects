import { v4 as uuidv4 } from "uuid"
import fileSchema from "../models/file_model.js"
import productsSchema from "../models/products_model.js"

// upload products data
export const uploadProductsData = (req, res) => {
    try {
        req.upload(req, res, async (error) => {
            if (error) {
                res.status(404).json({
                    message: `${error}`
                })
            }
            if (req.file) {
                const { name, brand, price, description } = req.body
                if (!name) {
                    res.status(500).json({
                        message: 'Name field is required',
                    })
                }
                else if (!price) {
                    res.status(500).json({
                        message: 'Price field is required',
                    })
                }
                else {
                    // check product exists
                    const product = await productsSchema.findOne({
                        name: name
                    })
                    if (product) {
                        res.status(500).json({
                            message: 'Product already exists'
                        })
                    } else {
                        // save image
                        req.file.uuid = uuidv4()
                        const image = await fileSchema.create(req.file)

                        // save product
                        const port = process.env.PORT || 3000
                        const newProduct = productsSchema({
                            name,
                            brand,
                            price,
                            description,
                            image: `http://localhost:${port}/public/uploads/${image.filename}`,
                        })

                        await newProduct.save()
                        res.status(201).json({
                            message: 'New product added',
                            newProduct,
                        })
                    }
                }
            }
        })
    } catch (error) {
        res.status(404).json({
            message: 'Something went wrong',
            error: error
        })
    }
}

// get products data
export const getProductsData = async (req, res) => {
    try {
        const products = await productsSchema.find({})
        res.status(200).json({
            message: `${products.length} items`,
            products
        })
    } catch (error) {
        res.status(404).json({
            message: 'Something went wrong',
            error: error
        })
    }
}

// delete product 
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        await productsSchema.findByIdAndDelete(id)
        res.status(200).json({
            message: 'Product deleted'
        })
    } catch (error) {
        res.status(404).json({
            message: 'Something went wrong',
            error: error
        })
    }
}