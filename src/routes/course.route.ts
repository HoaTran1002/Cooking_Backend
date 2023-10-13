import { Request, Response, Router } from 'express'
import { getAll, courseCreate, courseUpFiles, courseCreateRoadmap } from '~/controllers/course.controller'
import { asyncHandelError } from '~/middlewares/error.middlewear'
import { upload } from '~/middlewares/multer.middlewear'
const router = Router()

router.get('/getAll', asyncHandelError(getAll))
router.post('/create', asyncHandelError(courseCreate))
router.post('/:courseId/roadmap/create', asyncHandelError(courseCreateRoadmap))
router.post('/:courseId/uploadFiles', upload.array('uploadFiles'), asyncHandelError(courseUpFiles))
router.post('/:courseId/update')
router.post('/:courseId/remove')
router.post('/:courseId/roadmap/:roadmapId/remove', asyncHandelError(courseCreateRoadmap))
router.post('/:courseId/roadmap/:roadmapId/update', asyncHandelError(courseCreateRoadmap))
router.post('/:courseId/uploadFile', upload.single('uploadFile'), asyncHandelError(courseUpFiles))
router.post('/:courseId/file/:fileId/remove', upload.array('uploadFile'), asyncHandelError(courseUpFiles))
router.post('/:courseId/files/remove', upload.array('uploadFile'), asyncHandelError(courseUpFiles))
export default router
