import { Router } from 'express'
import { uploadDisk, uploadMemory } from '~/config/multer.config'
import pageManageModule from '~/controllers/pageManageController.controllers'
import { asyncHandelError } from '~/middlewares/error.middlewear'

const router = Router()
router.post('/create', uploadDisk.single('file'), asyncHandelError(pageManageModule.create))
router.get('/getAll/:page/:size', asyncHandelError(pageManageModule.getAll))
router.get('/:id/getById', asyncHandelError(pageManageModule.getById))
router.delete('/:id/deleteById', uploadMemory.single('file'), asyncHandelError(pageManageModule.deleteById))
router.patch('/:id/update', asyncHandelError(pageManageModule.updateById))
export default router
