import { Router } from 'express'
import ServicesCustomerController from '~/controllers/serviceCustomer.controller'
import { asyncHandelError } from '~/middlewares/error.middlewear'

const router = Router()
router.post('/create', asyncHandelError(ServicesCustomerController.create))
router.get('/getAll/:page/:size', asyncHandelError(ServicesCustomerController.getAll))
router.get('/:id/getById', asyncHandelError(ServicesCustomerController.getById))
router.delete('/:id/deleteById', asyncHandelError(ServicesCustomerController.deleteById))
router.patch('/:id/update', asyncHandelError(ServicesCustomerController.updateById))
export default router
