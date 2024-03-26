import { Router } from 'express'
import { uploadDisk, uploadMemory } from '~/config/multer.config'
import CandicateInforController from '~/controllers/candicateInfor.controller'
import { asyncHandelError } from '~/middlewares/error.middlewear'

const router = Router()
router.post('/create', uploadDisk.single('file'), asyncHandelError(CandicateInforController.create))
router.get('/getAll/:page/:size', asyncHandelError(CandicateInforController.getAll))
router.get('/:id/getById', asyncHandelError(CandicateInforController.getById))
router.delete('/:id/deleteById', asyncHandelError(CandicateInforController.deleteById))
router.patch('/:id/update', uploadMemory.single('file'), asyncHandelError(CandicateInforController.updateById))
export default router
