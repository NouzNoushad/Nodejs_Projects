import multer from "multer";
import path from "path"

export const uploadImage = (req, res, next) => {
    // create storage
    const storage = multer.diskStorage({
        destination: (req, file, cb) => cb(null, 'public/uploads'),
        filename: (req, file, cb) => {
            const fileName = `${Date.now()}-${Math.round(Math.random() * 1E8)}${path.extname(file.originalname)}`
            cb(null, `${fileName}`)
        }
    })

    // upload image
    const upload = multer({
        storage,
        limits: { fileSize: 1000000 * 5 }
    }).single('image')

    req.upload = upload
    next()
}