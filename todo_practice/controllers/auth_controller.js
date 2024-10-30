import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import authSchema from "../models/auth_model.js"

// signup user
export const signUp = (req, res) => {
    try {
        const { name, email, password } = req.body
        bcrypt.hash(password, 10).then(async (password) => {
            const authModel = authSchema({
                name,
                email,
                password
            })
            const user = await authModel.save()
            res.status(200).json({
                message: "Account has created",
                data: {
                    name: user.name,
                    email: user.email,
                    password: user.password
                }
            })
        })
    } catch (error) {
        res.status(500).json({
            message: "Error while sign up",
            error,
        })
    }
}

// signin user
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await authSchema.findOne({
            email: email
        })
        if (user) {
            bcrypt.compare(password, user.password).then((status) => {
                if (status) {
                    jwt.sign({
                        id: user._id,
                        name: user.name,
                    }, process.env.SECRET_KEY, {
                        expiresIn: 60 * 60 * 24 * 30
                    }, (error, token) => {
                        if (token) {
                            res.status(200).json({
                                message: "Logged in",
                                token
                            })
                        } else {
                            res.status(404).json({
                                message: "Something went wrong",
                                error
                            })
                        }
                    })
                } else {
                    res.status(404).json({
                        message: "Invalid password",
                    })
                }
            })
        } else {
            res.status(404).json({
                message: "User not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Error while sign in",
            error,
        })
    }
}

// set blacklist
export const blackList = new Set()

// logout
export const logout = (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]

        blackList.add(token)
        jwt.verify(token, process.env.SECRET_KEY, {
            ignoreExpiration: true
        })
        res.status(200).json({
            message: "Logged out"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error while logout",
            error,
        })
    }
}