import { Router } from 'express'
import policyController from '~/controllers/policy.controllers'
import { asyncHandelError } from '~/middlewares/error.middlewear'

const router = Router()
router.post('/create', asyncHandelError(policyController.create))
router.get('/getAll/:page/:size', asyncHandelError(policyController.getAll))
router.get('/:id/getById', asyncHandelError(policyController.getById))
router.delete('/:id/deleteById', asyncHandelError(policyController.deleteById))
router.patch('/:id/update', asyncHandelError(policyController.updateById))
export default router
