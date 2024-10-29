import express from "express";
import mongoose from "mongoose";
import todoRoute from "./routes/todo_route.js"
import authRoute from "./routes/auth_route.js"
import dotenv from "dotenv"

const app = express()
const PORT = process.env.PORT || 3000;

dotenv.config({ path: "./conn.env" })

mongoose.connect(process.env.CONN_STR)

const db = mongoose.connection

db.on('error', (error) => console.log(`Error: ${error}`))
db.once('open', () => console.log('database connected'))

app.use(express.json())

app.use('/', authRoute)
app.use('/todo', todoRoute)

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
})
