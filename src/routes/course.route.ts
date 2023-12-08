import { Router } from 'express'
// eslint-disable-next-line prettier/prettier
import {
  getAll,
  courseCreate,
  courseCreateRoadmap,
  courseUpdateById,
  updateRoadmapById,
  removeRoadmapById,
  removeCourseById
} from '~/controllers/course.controller'
import { ICourse, IRoadmap } from '~/interfaces/course.interface'
import { authorize } from '~/middlewares/auth.middlewears'
import { asyncHandelError } from '~/middlewares/error.middlewear'
import { validateBody } from '~/middlewares/validate.middlewear'
import { courseValidate, roadmapValidate } from '~/validator/course.validator'
const router = Router()

router.get('/getAll', asyncHandelError(getAll))
router.post('/create', validateBody<ICourse>(courseValidate), asyncHandelError(courseCreate))
router.get('/:courseId/roadmap/getAll', authorize(), asyncHandelError(courseCreateRoadmap))
router.post(
  '/:courseId/roadmap/create',
  authorize(),
  validateBody<IRoadmap>(roadmapValidate),
  asyncHandelError(courseCreateRoadmap)
)

router.put('/:courseId/update', authorize(), validateBody<ICourse>(courseValidate), asyncHandelError(courseUpdateById))
router.put(
  '/:courseId/roadmap/:roadmapId/update',
  authorize(),
  validateBody<IRoadmap>(roadmapValidate),
  asyncHandelError(updateRoadmapById)
)
router.delete('/:courseId/roadmap/:roadmapId/remove', authorize(), asyncHandelError(removeRoadmapById))
router.delete('/:courseId/remove', authorize(), asyncHandelError(removeCourseById))
export default router
