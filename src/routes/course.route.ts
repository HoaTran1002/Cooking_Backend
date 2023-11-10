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
import { authorize } from '~/middlewares/auth.middlewears'
import { asyncHandelError } from '~/middlewares/error.middlewear'
import { upload } from '~/middlewares/multer.middlewear'
const router = Router()

router.get('/getAll', authorize(), asyncHandelError(getAll))
router.post('/create', authorize(), asyncHandelError(courseCreate))
router.post('/:courseId/roadmap/create', authorize(), asyncHandelError(courseCreateRoadmap))
// eslint-disable-next-line prettier/prettier
router.post(
  '/:courseId/uploadFiles',
  authorize(),
  upload.array('uploadFiles'),
  asyncHandelError(courseUpFiles)
)
// eslint-disable-next-line prettier/prettier
router.post(
  '/:courseId/uploadFile',
  authorize(),
  upload.single('uploadFile'),
  asyncHandelError(courseUpFiles)
)
router.put('/:courseId/update', authorize(), asyncHandelError(courseUpdateById))
router.put('/:courseId/roadmap/:roadmapId/update', authorize(), asyncHandelError(updateRoadmapById))
router.delete('/:courseId/roadmap/:roadmapId/remove', authorize(), asyncHandelError(removeRoadmapById))
router.delete('/:courseId/remove', authorize(), asyncHandelError(removeCourseById))
export default router
