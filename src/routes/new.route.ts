import { Router } from 'express'
import { newsFacadePatten } from '~/controllers/news.controller'
import { asyncHandelError } from '~/middlewares/error.middlewear'
const route = Router()
const news = new newsFacadePatten()
route.post('/createNews', asyncHandelError(news.createNews))
