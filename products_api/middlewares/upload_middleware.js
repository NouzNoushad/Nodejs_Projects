import multer from "multer"
import path from "path"

export const uploadProductImage = (req, res, next) => {
    // store image
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/uploads')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }
    })

    // upload
    const upload = multer({ storage: storage }).single('image')

    req.upload = upload
    next()
}