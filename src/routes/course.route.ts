import { Request, Response, Router } from 'express'
import { getAll, courseCreate, courseUpFiles, courseRoadmap } from '~/controllers/course.controller'
import { asyncHandelError } from '~/middlewares/error.middlewear'
import { upload } from '~/middlewares/multer.middlewear'
const router = Router()

router.get('/getAll', asyncHandelError(getAll))
router.post('/create', asyncHandelError(courseCreate))
router.post('/:courseId/update')
router.post('/:courseId/remove')
router.post('/:courseId/roadmap/:roadmapId/create', asyncHandelError(courseRoadmap))
router.post('/:courseId/roadmap/:roadmapId/remove', asyncHandelError(courseRoadmap))
router.post('/:courseId/roadmap/:roadmapId/update', asyncHandelError(courseRoadmap))
router.post('/:courseId/uploadFile', upload.array('uploadFile'), asyncHandelError(courseUpFiles))
router.post('/:courseId/file/:fileId/remove', upload.array('uploadFile'), asyncHandelError(courseUpFiles))
router.post('/:courseId/files/remove', upload.array('uploadFile'), asyncHandelError(courseUpFiles))
export default router
