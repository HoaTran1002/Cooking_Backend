import { Router } from 'express'
import { uploadMemory } from '~/config/multer.config'
import {
  deleteAllImageFromS3ByCourseId,
  getAllImageFromS3ByCourseId,
  uploadImageFromLocalToS3ByCourseId
} from '~/controllers/upload.controllers'
import { asyncHandelError } from '~/middlewares/error.middlewear'

const router = Router()
router.post(
  '/uploadImageFromLocalS3/:idCourse',
  uploadMemory.single('file'),
  asyncHandelError(uploadImageFromLocalToS3ByCourseId)
)
router.get('/getAllImageFromS3/:idCourse', asyncHandelError(getAllImageFromS3ByCourseId))
router.delete('/deleteAllImageImageFromS3/:idCourse', asyncHandelError(deleteAllImageFromS3ByCourseId))

export default router
