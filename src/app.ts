import express from 'express'
import { connnectDB } from './config/db/mongodb.db'
import { env } from './config/env.config'
const app = express()

connnectDB()
app.listen(env.PORT)
