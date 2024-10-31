import { v4 as uuidv4 } from "uuid";
import fileSchema from "../models/file_model.js";
import userSchema from "../models/user_model.js";

// upload user data
export const uploadUserData = (req, res) => {
    try {
        req.upload(req, res, async (error) => {
            if (error) {
                res.status(404).json({
                    message: `${error}`
                })
            }
            if (req.file) {
                // save image
                req.file.uuid = uuidv4()
                const image = await fileSchema.create(req.file)

                // validations
                const { name, email } = req.body
                if (!name || !email) {
                    res.status(500).json({
                        message: 'All fields are required'
                    })
                } else {
                    // check user exists
                    const user = await userSchema.findOne({
                        email: email
                    })
                    if (user) {
                        res.status(500).json({
                            message: 'Email already taken'
                        })
                    } else {
                        // save user
                        const port = process.env.PORT || 3000
                        const newUser = userSchema({
                            name,
                            email,
                            image: `http://localhost:${port}/public/uploads/${image.filename}`
                        })
                        await newUser.save()
                        res.status(201).json({
                            message: 'New User Added'
                        })
                    }
                }
            }
        })
    } catch (error) {
        res.status(404).json({
            message: 'Something went wrong',
            error: error,
        })
    }
}