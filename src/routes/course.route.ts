import { Router } from 'express'
import { getAll } from '~/controllers/course.controller'

const router = Router()

router.get('/', getAll)

export default router
