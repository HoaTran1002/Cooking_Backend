import { Router } from 'express'
import CategoryServicesCustomerController from '~/controllers/categoryServicesCustomer.controller'
import { asyncHandelError } from '~/middlewares/error.middlewear'

const router = Router()
router.post('/create', asyncHandelError(CategoryServicesCustomerController.create))
router.get('/getAll/:page/:size', asyncHandelError(CategoryServicesCustomerController.getAll))
router.get('/:id/getById', asyncHandelError(CategoryServicesCustomerController.getById))
router.delete('/:id/deleteById', asyncHandelError(CategoryServicesCustomerController.deleteById))
router.patch('/:id/update', asyncHandelError(CategoryServicesCustomerController.updateById))
export default router
