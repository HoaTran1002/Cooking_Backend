import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db/mongodb.db'
import { env } from './config/env.config'
import useRoutes from './routes/index.route'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
const app = express()

const corsOptions = {
  origin: ['https://momvietnam.vn', 'http://localhost:5173'],
  optionsSuccessStatus: 200,
  credentials: true
}

app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
connectDB()
useRoutes(app)
app.listen(env.PORT)
