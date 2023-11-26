import { Router } from 'express'
import { uploadMemory } from '~/config/multer.config'
import {
  deleteAllImageFromS3ByCourseId,
  deleteAllVideoFromS3ByCourseId,
  deleteImageFromS3ByCourseId,
  deleteVideoFromS3ByCourseId,
  getAllImageFromS3ByCourseId,
  getAllVideoFromS3ByCourseId,
  getImageFromS3BykeyImage,
  getVideoFromS3BykeyVideo,
  uploadImageFromLocalToS3ByCourseId,
  uploadVideoFromLocalToS3ByCourseId
} from '~/controllers/upload.controllers'
import { asyncHandelError } from '~/middlewares/error.middlewear'

const router = Router()
router.post(
  '/uploadImageFromLocalS3/:idCourse',
  uploadMemory.single('file'),
  asyncHandelError(uploadImageFromLocalToS3ByCourseId)
)
router.get('/getAllImageFromS3/:idCourse', asyncHandelError(getAllImageFromS3ByCourseId))
router.get('/:keyImage/getAllImageFromS3', asyncHandelError(getImageFromS3BykeyImage))

router.delete('/deleteAllImageFromS3/:idCourse', asyncHandelError(deleteAllImageFromS3ByCourseId))
router.delete(
  '/:keyImage/deleteImageFromS3ByCourseId/:idCourse',
  asyncHandelError(deleteImageFromS3ByCourseId)
)

router.post(
  '/uploadImageFromLocalS3/:idCourse',
  uploadMemory.single('file'),
  asyncHandelError(uploadVideoFromLocalToS3ByCourseId)
)
router.get('/getAllVideoFromS3/:idCourse', asyncHandelError(getAllVideoFromS3ByCourseId))
router.get('/:keyVideo/getAllVideoFromS3', asyncHandelError(getVideoFromS3BykeyVideo))

router.delete('/deleteAllVideoFromS3/:idCourse', asyncHandelError(deleteAllVideoFromS3ByCourseId))
router.delete(
  '/:keyVideo/deleteVideoFromS3ByCourseId/:idCourse',
  asyncHandelError(deleteVideoFromS3ByCourseId)
)
export default router
