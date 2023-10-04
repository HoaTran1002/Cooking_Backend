import express from 'express'
import { connnectDB } from './config/db/mongodb.db'
import { env } from './config/env.config'
import useRoutes from './routes/index.route'
import bodyParser from 'body-parser'
const app = express()

app.use(bodyParser.json())
connnectDB()
useRoutes(app)
app.listen(env.PORT)
