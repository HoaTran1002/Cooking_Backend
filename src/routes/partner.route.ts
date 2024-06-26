import { Router } from 'express'
import { uploadDisk, uploadMemory } from '~/config/multer.config'
import { IPartner } from '~/contract/interfaces/partner.interface'
import partnerModule from '~/controllers/partner.controller'
import { asyncHandelError } from '~/middlewares/error.middlewear'
import { validator } from '~/middlewares/validate.middlewear'
import { partnerValidator } from '~/validator/partner.validate'

const router = Router()
router.post(
  '/create',
  uploadDisk.single('file'),
  validator<IPartner>(partnerValidator),
  asyncHandelError(partnerModule.create)
)
router.get('/getAll/:page/:size', asyncHandelError(partnerModule.getAll))
router.get('/:id/getById', asyncHandelError(partnerModule.getById))
router.delete('/:id/deleteById', asyncHandelError(partnerModule.deleteById))
router.patch('/:id/update', uploadMemory.single('file'), asyncHandelError(partnerModule.updateById))
export default router
