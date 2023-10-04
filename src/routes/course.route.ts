import { Router } from 'express'
import { getAll, courseCreate } from '~/controllers/course.controller'
import { asyncHandelError } from '~/middlewares/error.middlewear'

const router = Router()

router.get('/', asyncHandelError(getAll))
router.post('/create', asyncHandelError(courseCreate))
export default router
