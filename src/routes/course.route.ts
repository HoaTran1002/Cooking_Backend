import { Request, Response, Router } from 'express'
import { getAll, courseCreate, courseUpFiles, courseRoadmap } from '~/controllers/course.controller'
import { asyncHandelError } from '~/middlewares/error.middlewear'
import { upload } from '~/middlewares/multer.middlewear'
const router = Router()

router.get('/getAll', asyncHandelError(getAll))
router.post('/create', asyncHandelError(courseCreate))
router.post('/:courseId/roadmap/create', asyncHandelError(courseRoadmap))
router.post('/:courseId/uploadFile', upload.array('uploadFile'), asyncHandelError(courseUpFiles))
export default router
