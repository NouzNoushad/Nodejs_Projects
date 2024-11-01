import mongoose from "mongoose";

const { Schema } = mongoose

const todoSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

export default mongoose.model('todo', todoSchema);