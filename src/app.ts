import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db/mongodb.db'
import { env } from './config/env.config'
import useRoutes from './routes/index.route'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
const app = express()

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
connectDB()
useRoutes(app)
app.listen(env.PORT)
