import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"
import userRoute from "./routes/user_route.js"

const app = express()
const PORT = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: './.env'})

mongoose.connect(process.env.CONN_STR)

const db = mongoose.connection

db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Database Connected'))

app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', userRoute)

app.listen(PORT, () => console.log(`Server connected to PORT ${PORT}`))
