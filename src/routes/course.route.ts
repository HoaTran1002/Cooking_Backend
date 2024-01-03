import { Router } from 'express'
import { uploadDisk, uploadMemory } from '~/config/multer.config'
// eslint-disable-next-line prettier/prettier
import {
  getAll,
  courseCreate,
  courseCreateRoadmap,
  courseUpdateById,
  updateRoadmapById,
  removeRoadmapById,
  removeCourseById,
  uploadImageFromLocalToVPSByCourseId,
  uploadVideoFromLocalToVPSByCourseId,
  deleteImageFromVPSByCourseId,
  updateContentImageVPS,
  deleteVideoVPSByCourseId,
  updateContentVideoVPS,
  removeAllVideoByCourseById,
  removeAllImageByCourseById
} from '~/controllers/course.controller'
// import {
//   uploadImageFromLocalToS3ByCourseId,
//   updateContentImageS3,
//   deleteAllImageFromS3ByCourseId,
//   getAllImageFromS3ByCourseId,
//   getImageFromS3BykeyImage,
//   uploadVideoFromLocalToS3ByCourseId,
//   deleteVideoFromS3ByCourseId,
//   deleteAllVideoFromS3ByCourseId,
//   getAllVideoFromS3ByCourseId,
//   getVideoFromS3BykeyVideo
// } from '~/controllers/uploadToS3.controllers'
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
router.delete('/:courseId/remove', asyncHandelError(removeCourseById))

//file
//image
router.post(
  '/uploadImageFromLocal/:idCourse',
  uploadDisk.single('file'),
  asyncHandelError(uploadImageFromLocalToVPSByCourseId)
)
router.delete('/:keyImage/deleteImageFromVPSByCourseId/:idCourse', asyncHandelError(deleteImageFromVPSByCourseId))
router.put(
  '/:idCourse/updateContentImage/:keyImage',
  uploadMemory.single('file'),
  asyncHandelError(updateContentImageVPS)
)
router.delete('/:idCourse/removeAllImageByCourseById', asyncHandelError(removeAllImageByCourseById))

// router.delete('/deleteAllImageFrom/:idCourse', asyncHandelError(deleteAllImageFromS3ByCourseId))
// router.get('/getAllImageFrom/:idCourse', asyncHandelError(getAllImageFromS3ByCourseId))
// router.get('/:keyImage/getImageFrom', asyncHandelError(getImageFromS3BykeyImage))

//video
router.post(
  '/uploadVideoFromLocalToVPS/:idCourse',
  uploadDisk.single('file'),
  asyncHandelError(uploadVideoFromLocalToVPSByCourseId)
)
router.delete('/:idCourse/deleteVideoByCourseId/:keyVideo', asyncHandelError(deleteVideoVPSByCourseId))
router.put(
  '/:idCourse/updateContentVideo/:keyVideo',
  uploadMemory.single('file'),
  asyncHandelError(updateContentVideoVPS)
)
router.delete('/:idCourse/removeAllVideoByCourseById', asyncHandelError(removeAllVideoByCourseById))
// router.delete('/deleteAllVideoFromS3/:idCourse', asyncHandelError(deleteAllVideoFromS3ByCourseId))
// router.get('/getAllVideoFromS3/:idCourse', asyncHandelError(getAllVideoFromS3ByCourseId))
// router.get('/:keyVideo/getVideoFromS3', asyncHandelError(getVideoFromS3BykeyVideo))
export default router
