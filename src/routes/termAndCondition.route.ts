import { Router } from 'express'
import TermAndConditionController from '~/controllers/termAndCondition.controller'
import { asyncHandelError } from '~/middlewares/error.middlewear'

const router = Router()
router.post('/create', asyncHandelError(TermAndConditionController.create))
router.get('/getAll/:page/:size', asyncHandelError(TermAndConditionController.getAll))
router.get('/:id/getById', asyncHandelError(TermAndConditionController.getById))
router.delete('/:id/deleteById', asyncHandelError(TermAndConditionController.deleteById))
router.patch('/:id/update', asyncHandelError(TermAndConditionController.updateById))
export default router
