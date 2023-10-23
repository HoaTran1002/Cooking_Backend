import { Request, Response, Router } from 'express'
import {
  getAll,
  courseCreate,
  courseUpFiles,
  courseCreateRoadmap,
  courseUpdateById,
  updateRoadmapById,
  removeRoadmapById,
  removeCourseById
} from '~/controllers/course.controller'
import { asyncHandelError } from '~/middlewares/error.middlewear'
import { upload } from '~/middlewares/multer.middlewear'
const router = Router()

router.get('/getAll', asyncHandelError(getAll))
router.post('/create', asyncHandelError(courseCreate))
router.post('/:courseId/roadmap/create', asyncHandelError(courseCreateRoadmap))
// router.post('/:courseId/uploadFiles', upload.array('uploadFiles'), asyncHandelError(courseUpFiles))
// router.post('/:courseId/uploadFile', upload.single('uploadFile'), asyncHandelError(courseUpFiles))
router.put('/:courseId/update', asyncHandelError(courseUpdateById))
router.put('/:courseId/roadmap/:roadmapId/update', asyncHandelError(updateRoadmapById))
router.delete('/:courseId/roadmap/:roadmapId/remove', asyncHandelError(removeRoadmapById))
router.delete('/:courseId/remove', asyncHandelError(removeCourseById))
export default router
