import { Router } from 'express'
import { uploadDisk, uploadMemory } from '~/config/multer.config'
import partnerProductModule from '~/controllers/partnerProduct.controllers'
import { asyncHandelError } from '~/middlewares/error.middlewear'

const router = Router()
router.post('/create', uploadDisk.single('file'), asyncHandelError(partnerProductModule.create))
router.get('/getAll/:page/:size', asyncHandelError(partnerProductModule.getAll))
router.get('/:id/getById', asyncHandelError(partnerProductModule.getById))
router.delete('/:id/deleteById', uploadMemory.single('file'), asyncHandelError(partnerProductModule.deleteById))
router.patch('/:id/update', asyncHandelError(partnerProductModule.updateById))
export default router
