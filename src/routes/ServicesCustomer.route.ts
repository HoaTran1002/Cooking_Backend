import { Router } from 'express'
import { uploadDisk, uploadMemory } from '~/config/multer.config'
import ServicesCustomerController from '~/controllers/serviceCustomer.controller'
import { asyncHandelError } from '~/middlewares/error.middlewear'

const router = Router()
router.post('/create', uploadDisk.single('file'), asyncHandelError(ServicesCustomerController.create))
router.get('/getAll/:page/:size', asyncHandelError(ServicesCustomerController.getAll))
router.get('/:id/getById', asyncHandelError(ServicesCustomerController.getById))
router.delete('/:id/deleteById', asyncHandelError(ServicesCustomerController.deleteById))
router.patch('/:id/update', uploadMemory.single('file'), asyncHandelError(ServicesCustomerController.updateById))
export default router
