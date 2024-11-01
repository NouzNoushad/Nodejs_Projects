import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

const app = express()
const PORT = process.env.PORT || 3000

dotenv.config({ path: './.env' })

mongoose.connect(process.env.CONN_STR)

const db = mongoose.connection

db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Database connected'))

app.use('/', (req, res) => res.send("send"))

app.listen(PORT, () => {
    console.log(`Server connected to PORT: ${PORT}`);
})