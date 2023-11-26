import { Router } from 'express'
import { uploadMemory } from '~/config/multer.config'
import {
  deleteImageFromS3Storage,
  getImageFromS3Storage,
  uploadImageFromLocalToS3
} from '~/controllers/upload.controllers'
import { asyncHandelError } from '~/middlewares/error.middlewear'

const router = Router()
router.post(
  '/uploadImageFromLocalS3/:idCourse',
  uploadMemory.single('file'),
  asyncHandelError(uploadImageFromLocalToS3)
)
router.get('/getImageFromS3Storage', uploadMemory.single('file'), asyncHandelError(getImageFromS3Storage))
router.delete('/deleteImageS3', uploadMemory.single('file'), asyncHandelError(deleteImageFromS3Storage))

export default router
