import { Router } from 'express'
import {
  getAll,
  courseCreate,
  courseCreateRoadmap,
  courseUpdateById,
  updateRoadmapById,
  removeRoadmapById,
  removeCourseById
} from '~/controllers/course.controller'
import { authorize } from '~/middlewares/auth.middlewears'
import { asyncHandelError } from '~/middlewares/error.middlewear'
const router = Router()

router.get('/getAll', authorize(), asyncHandelError(getAll))
router.post('/create', authorize(), asyncHandelError(courseCreate))
router.post('/:courseId/roadmap/create', authorize(), asyncHandelError(courseCreateRoadmap))

router.put('/:courseId/update', authorize(), asyncHandelError(courseUpdateById))
router.put('/:courseId/roadmap/:roadmapId/update', authorize(), asyncHandelError(updateRoadmapById))
router.delete('/:courseId/roadmap/:roadmapId/remove', authorize(), asyncHandelError(removeRoadmapById))
router.delete('/:courseId/remove', authorize(), asyncHandelError(removeCourseById))
export default router
