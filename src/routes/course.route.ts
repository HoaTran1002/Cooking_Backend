import { Router } from 'express'
import { getAll, courseCreate } from '~/controllers/course.controller'
import { asyncHandelError } from '~/middlewares/error.middlewear'

const router = Router()

router.get('/', getAll)
router.post('/course/create')
export default router
