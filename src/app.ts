import express from 'express'
import { connnectDB } from './config/db/mongodb.db'
import { env } from './config/env.config'
import useRoutes from './routes/index.route'
const app = express()

connnectDB()
useRoutes(app)
app.listen(env.PORT)
