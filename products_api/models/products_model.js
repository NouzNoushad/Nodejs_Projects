import mongoose from "mongoose";

const { Schema } = mongoose

const productSchema = Schema({
    image: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    }
}, {
    timestamps: true
})

export default mongoose.model('products', productSchema)