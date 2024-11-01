import express, { urlencoded } from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import productsRoute from "./routes/products_routes.js"

const app = express()
const PORT = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

dotenv.config({ path: './.env' })

mongoose.connect(process.env.CONN_STR)

const db = mongoose.connection

db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Database connected'))

app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(urlencoded({ extended: false }))

app.use('/', productsRoute)

app.listen(PORT, () => {
    console.log(`Server connected to PORT: ${PORT}`);
})